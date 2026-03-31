import fs from 'fs';
import csv from 'csv-parser';

const stopsMap = {};
const graph = {};

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

            if (prevTrip === trip && prevStop && stop && prevDeparture != null) {

                const travelTime = arrival - prevDeparture;

                if(travelTime > 0 && travelTime < 3600){
                    graph[prevStop].push({
                        station: stop,
                        time: travelTime 
                    });

                    graph[stop].push({
                        station: prevStop,
                        time: travelTime 
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