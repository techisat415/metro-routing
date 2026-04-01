import fs from 'fs';
import csv from 'csv-parser';

const stopsMap = {};
const graph = {};
const tripToRoute = {};
const routeIdToLine = {};

await new Promise((resolve) => {
    fs.createReadStream('src/data/gtfs/routes.txt')
    .pipe(csv())
    .on('data', (row) => {
        const fullName = row.route_long_name || "";
        const line = fullName.split("_")[0];

        routeIdToLine[row.route_id] = line;
    })
    .on('end', resolve);
});

await new Promise((resolve) => {
    fs.createReadStream('src/data/gtfs/trips.txt')
    .pipe(csv())
    .on('data', (row) => {
        tripToRoute[row.trip_id] = row.route_id;
    })
    .on('end', resolve);
});

const timeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(':').map(Number);
    return h * 3600 + m * 60 + s;
};

const buildMetroGraph = async() => {
    console.log("Building metro graph...");

    await new Promise((resolve) => {
        fs.createReadStream('src/data/gtfs/stops.txt')
        .pipe(csv())
        .on('data', (row) => {
            stopsMap[row.stop_id] = row.stop_name;
            graph[row.stop_name] = [];
        })
        .on('end', resolve);
    });

    let prevTrip = null;
    let prevStop = null;
    let prevDeparture = null;

    await new Promise((resolve) => {
        fs.createReadStream('src/data/gtfs/stop_times.txt')
        .pipe(csv())
        .on('data', (row) => {

            const trip = row.trip_id;
            const stop = stopsMap[row.stop_id];
            const arrival = timeToSeconds(row.arrival_time);
            const routeId = tripToRoute[trip];
            const line = routeIdToLine[routeId];

            if (prevTrip === trip && prevStop && stop && prevDeparture != null) {

                const travelTime = arrival - prevDeparture;

                if(travelTime > 0 && travelTime < 3600){
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
            prevDeparture = timeToSeconds(row.departure_time);
        })
        .on('end', resolve);
    });

    console.log("Metro graph built successfully.");

    return graph;
}


export { buildMetroGraph };