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

    const routeResult = (result) => {

        let interchanges = 0;

        for (let i = 1; i < result.path.length; i++) {

            const prevLine = result.path[i - 1].line;
            const currLine = result.path[i].line;

            if (!prevLine || !currLine) continue;

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

        for (let i = 1; i < result.path.length; i++) {

            const curr = result.path[i];
            const prev = result.path[i - 1];

            if (curr.line === prev.line) {

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

        const linesUsed = new Set();

        for (const node of result.path) {
            if (node.line) {
                linesUsed.add(node.line);
            }
}

        return {
            segments,
            interchanges,
            travelTime: result.time
                ? Math.round(result.time / 60)
                : null,

            stationsCount: result.path.length - 1,
            linesCount: linesUsed.size
        };
    };

    const fastestResult = dijkstra(
        metroGraph,
        startPoint,
        endPoint,
        interchangeTimes
    );

    const minStationsResult = bfs(
        metroGraph,
        startPoint,
        endPoint
    );

    return {
        startPoint,
        endPoint,

        fastest: routeResult(fastestResult),

        minStations: routeResult(minStationsResult)
    };

    
}

export {
    findRoute
}