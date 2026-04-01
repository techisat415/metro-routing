const dijkstra = (graph, start, end) => {

    const distances = {};
    const prev = {};
    const visited = new Set();

    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    while (true) {
        let closestNode = null;

        for (let node in distances) {
            if (!visited.has(node) &&
                (closestNode === null || distances[node] < distances[closestNode])) {
                closestNode = node;
            }
        }

        if (closestNode === null) break;
        if (closestNode === end) break;

        visited.add(closestNode);

        for (let neighbor of graph[closestNode]) {
            const newDist = distances[closestNode] + neighbor.time;

            if (newDist < distances[neighbor.station]) {
                distances[neighbor.station] = newDist;
                prev[neighbor.station] = {
                    station: closestNode,
                    line: neighbor.line
                };
            }
        }
    }

    // reconstruct path
    const path = [];
    let curr = end;

    while (curr) {
        const prevNode = prev[curr];

        path.unshift({
            station: curr,
            line: prevNode ? prevNode.line : null
        });

        curr = prevNode ? prevNode.station : null;
    }

    return {
        path,
        time: distances[end]
    };
};

export { dijkstra };