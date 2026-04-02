import { buildMetroGraph } from "../graph/buildGraph.js";
import { dijkstra } from "../algorithms/dijkstra.js";
import { loadInterchangeTimes } from "../utils/loadInterchangeTimes.js";

let metroGraph = null;
// let interchanges = 0;
let interchangeTimes = {};

const initGraph = async () => {
    if (!metroGraph) {
        metroGraph = await buildMetroGraph();
        interchangeTimes = loadInterchangeTimes();
    }
};

const findRoute = async({startPoint, endPoint}) =>{

    await initGraph();

    if (!metroGraph[startPoint] || !metroGraph[endPoint]) {
        return null;
    }

    const result = dijkstra(metroGraph, startPoint, endPoint, interchangeTimes);

    let interchanges = 0;

    for (let i = 1; i < result.path.length; i++) {
        const prevLine = result.path[i - 1].line;
        const currLine = result.path[i].line;

        // skip invalid cases
        if (!prevLine || !currLine) continue;

        // count only REAL line changes
        if (prevLine !== currLine) {
            interchanges++;
        }
    }

    if (result.path.length > 1) {
        result.path[0].line = result.path[1].line;
    }

    const segments = [];
    let currentSegment = {
        line: result.path[0].line,
        stations: [result.path[0].station]
    };

    for(let i = 1; i < result.path.length; i++){
        const curr = result.path[i];
        const prev = result.path[i-1];

        if(curr.line === prev.line){
            currentSegment.stations.push(curr.station);
        } else {
            segments.push(currentSegment);
            currentSegment = {
                line: curr.line,
                stations: [prev.station, curr.station]
            };
        }
    }
    segments.push(currentSegment);

    return {
        startPoint,
        endPoint,
        segments: segments,
        // path: result.path,
        travelTime: Math.round(result.time / 60),
        bestRoute: 0,
        interchanges: interchanges,
    };
}

export {
    findRoute
}