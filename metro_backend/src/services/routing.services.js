import { buildMetroGraph } from "../graph/buildGraph.js";
import { dijkstra } from "../algorithms/dijkstra.js";

let metroGraph = null;

const initGraph = async() => {
    if(!metroGraph){
        metroGraph = await buildMetroGraph();
    }
};

const findRoute = async({startPoint, endPoint}) =>{

    await initGraph();

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