import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stopsMap = {};
const graph = {};
const tripToRoute = {};
const routeIdToLine = {};

const routes = await prisma.route.findMany();

for (const route of routes) {

    const fullName = route.longName || "";
    const line = fullName.split("_")[0];

    routeIdToLine[route.routeId] = line;
}

const trips = await prisma.trip.findMany();

for (const trip of trips) {
    tripToRoute[trip.tripId] = trip.routeId;
}

const timeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(':').map(Number);
    return h * 3600 + m * 60 + s;
};

const buildMetroGraph = async() => {
    console.log("Building metro graph...");

    const stops = await prisma.stop.findMany();

    for (const stop of stops) {

        stopsMap[stop.stopId] = stop.stopName;
        graph[stop.stopName] = [];
    }

    let prevTrip = null;
    let prevStop = null;
    let prevDeparture = null;

    const stopTimes = await prisma.stopTime.findMany({
        orderBy: [
            { tripId: 'asc' },
            { stopSequence: 'asc' }
        ]
    });

    for (const row of stopTimes) {

        const trip = row.tripId;
        const stop = stopsMap[row.stopId];
        const arrival = timeToSeconds(row.arrivalTime);

        const routeId = tripToRoute[trip];
        const line = routeIdToLine[routeId];

        if (prevTrip === trip && prevStop && stop && prevDeparture != null) {

            const travelTime = arrival - prevDeparture;

            if (travelTime > 0 && travelTime < 3600) {

                graph[prevStop].push({
                    station: stop,
                    time: travelTime,
                    line: line
                });

                graph[stop].push({
                    station: prevStop,
                    time: travelTime,
                    line: line
                });
            }
        }
        prevTrip = trip;
        prevStop = stop;
        prevDeparture = timeToSeconds(row.departureTime);
    }


    console.log("Metro graph built successfully.");

    return graph;
}


export { buildMetroGraph };