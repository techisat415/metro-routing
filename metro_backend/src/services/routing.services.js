import { metroGraph } from "../graph/metroGraph.js";
import { dijkstra } from "../algorithms/dijkstra.js";

const findRoute = async({startPoint, endPoint}) =>{

    if (!metroGraph[startPoint] || !metroGraph[endPoint]) {
        return null;
    }

    const result = dijkstra(metroGraph, startPoint, endPoint);

    return {
        startPoint,
        endPoint,
        path: result.path,
        travelTime: result.time,
        bestRoute: 0
    };
}

export {
    findRoute
}