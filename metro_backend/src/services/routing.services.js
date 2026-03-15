const findRoute = async({startPoint, endPoint}) =>{
    return {
        startPoint,
        endPoint,
        routes: [
            {
                path: ["Station A", "Station B", "Station C"],
                travelTime: 15,
                transfers: 0
            },
            {
                path: ["Station A", "Station D", "Station C"],
                travelTime: 18,
                transfers: 1
            }
        ],
        bestRoute: 0
    };
}

export {
    findRoute
}