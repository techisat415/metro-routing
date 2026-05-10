const dijkstra = (graph, start, end, interchangeTimes) => {

    const distances = {};
    const prev = {};
    const visited = new Set();

    for (const station in graph) {
        for (const neighbor of graph[station]) {
            const stateKey = `${station}|${neighbor.line}`;
            distances[stateKey] = Infinity;
            prev[stateKey] = null;
        }
    }

    for (const neighbor of graph[start]) {

        const stateKey = `${start}|${neighbor.line}`;

        distances[stateKey] = 0;

        prev[stateKey] = null;
    }

    while (true) {

        let closestState = null;

        for (const state in distances) {

            if (
                !visited.has(state) &&
                (
                    closestState === null ||
                    distances[state] < distances[closestState]
                )
            ) {
                closestState = state;
            }
        }

        if (closestState === null) break;

        visited.add(closestState);

        const [currentStation, currentLine] = closestState.split("|");

        if (currentStation === end) {

            const path = [];

            let curr = closestState;

            while (curr) {

                const [station, line] = curr.split("|");

                const prevStation = prev[curr] ? prev[curr].split('|')[0] : null;
                let distance = 0;
                if (prevStation) {
                    const edge = graph[prevStation].find(n => n.station === station && n.line === line);
                    if (edge) {
                        distance = edge.distance || 0;
                    }
                }

                path.unshift({
                    station,
                    line,
                    distance
                });

                curr = prev[curr];
            }

            return {
                path,
                time: distances[closestState]
            };
        }

        for (const neighbor of graph[currentStation]) {

            const nextStation = neighbor.station;
            const nextLine = neighbor.line;

            let extraTime = 0;

            // apply interchange penalty
            if (currentLine !== nextLine) {
                extraTime = interchangeTimes[currentStation] || 300;
            }

            const newDist =
                distances[closestState] +
                neighbor.time +
                extraTime;

            const nextState = `${nextStation}|${nextLine}`;

            if (
                distances[nextState] === undefined ||
                newDist < distances[nextState]
            ) {

                distances[nextState] = newDist;

                prev[nextState] = closestState;
            }
        }
    }

    return {
        path: [],
        time: Infinity
    };
};

export { dijkstra };