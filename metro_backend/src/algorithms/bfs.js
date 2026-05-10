const bfs = (graph, source, destination) => {

    if (!graph[source] || !graph[destination]) {
        return null;
    }

    const queue = [];
    const visited = new Set();

    queue.push({
        station: source,

        path: [
            {
                station: source,
                line: null,
                distance: 0
            }
        ],
        currentLine: null
    });

    visited.add(source);

    while (queue.length > 0) {

        const current = queue.shift();

        const currentStation = current.station;

        if (currentStation === destination) {

            return {
                path: current.path,
                time: null
            };
        }

        for (const neighbor of graph[currentStation]) {

            const nextStation = neighbor.station;
            const nextLine = neighbor.line;

            if (!visited.has(nextStation)) {
                visited.add(nextStation);

                queue.push({
                    station: nextStation,

                    path: [
                        ...current.path,
                        {
                            station: nextStation,
                            line: nextLine,
                            distance: neighbor.distance || 0
                        }
                    ],
                    currentLine: nextLine
                });
            }
        }
    }

    return {
        path: [],
        time: null
    };
};

export { bfs };