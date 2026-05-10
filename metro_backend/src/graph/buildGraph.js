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

const haversineDistance = (lat1, lon1, lat2, lon2) => {

    const toRad = (deg) => deg * (Math.PI / 180);

    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

const buildMetroGraph = async() => {
    console.log("Building metro graph...");

    const stops = await prisma.stop.findMany();

    for (const stop of stops) {

        stopsMap[stop.stopId] = {
            name: stop.stopName,
            lat: stop.stopLat,
            lon: stop.stopLon
        };
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
        const stopData = stopsMap[row.stopId];

        if (!stopData) continue;

        const stop = stopData.name;
        const arrival = timeToSeconds(row.arrivalTime);

        const routeId = tripToRoute[trip];
        const line = routeIdToLine[routeId];

        if (prevTrip === trip && prevStop && stop && prevDeparture != null) {

            const travelTime = arrival - prevDeparture;

            if (travelTime > 0 && travelTime < 3600) {

                graph[prevStop].push({
                    station: stop,
                    time: travelTime,
                    line: line,
                    distance: distance
                });

                graph[stop].push({
                    station: prevStop,
                    time: travelTime,
                    line: line,
                    distance: distance
                });
            }

            const prevStopData = Object.values(stopsMap)
            .find(s => s.name === prevStop);

            const currentStopData = stopData;

            const distance = haversineDistance(
                prevStopData.lat,
                prevStopData.lon,
                currentStopData.lat,
                currentStopData.lon
            );
        }

        prevTrip = trip;
        prevStop = stop;
        prevDeparture = timeToSeconds(row.departureTime);
    }


    console.log("Metro graph built successfully.");

    return graph;
}


export { buildMetroGraph };