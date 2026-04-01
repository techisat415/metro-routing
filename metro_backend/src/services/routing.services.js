import { buildMetroGraph } from "../graph/buildGraph.js";
import { dijkstra } from "../algorithms/dijkstra.js";

let metroGraph = null;
let interchanges = 0;

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

    for (let i = 1; i < result.path.length; i++){
        if(result.path[i].line !== result.path[i-1].line){
            if(result.path[i-1].line !== null){
                interchanges++;
            }
        }
    }

    return {
        startPoint,
        endPoint,
        path: result.path,
        travelTime: Math.round(result.time / 60),
        bestRoute: 0,
        interchanges: interchanges

    };
}

export {
    findRoute
}