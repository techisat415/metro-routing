import fs from 'fs';
import csv from 'csv-parser';

const stopsMap = {};
const graph = {};

const buildMetroGraph = async() => {
    console.log("Building metro graph...");

    await new Promise((resolve) => {
        fs.createReadStream('src/data/gtfs/stops.csv')
        .pipe(csv())
        .on('data', (row) => {
            stopsMap[row.stop_id] = row.stop_name;
            graph[row.stop_name] = [];
        })
        .on('end', resolve);
    });

    let prevTrip = null;
    let prevStop = null;

    await new Promise((resolve) => {
        fs.createReadStream('src/data/gtfs/stop_times.csv')
        .pipe(csv())
        .on('data', (row) => {

            const trip = row.trip_id;
            const stop = stopsMap[row.stop_id];

            if (prevTrip === trip && prevStop && stop) {

                graph[prevStop].push({
                    station: stop,
                    time: 2 // to be updated with actual time from stop_times.csv
                });

                graph[stop].push({
                    station: prevStop,
                    time: 2 // to be updated with actual time from stop_times.csv
                });
            }
            prevTrip = trip;
            prevStop = stop;
        })
        .on('end', resolve);
    });

    console.log("Metro graph built successfully.");

    return graph;
}


export { buildMetroGraph };