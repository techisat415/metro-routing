const bfs = (graph, source, destination) => {

    if (!graph[source] || !graph[destination]) {
        return null;
    }

    const queue = [];
    const visited = new Set();

    queue.push({
        station: source,
        path: [source],
        interchanges: 0,
        currentLine: null
    });

    visited.add(source);

    while (queue.length > 0) {

        const current = queue.shift();

        const currentStation = current.station;

        if (currentStation === destination) {

            return {
                path: current.path,
                stationsCount: current.path.length - 1,
                interchanges: current.interchanges
            };
        }

        for (const neighbor of graph[currentStation]) {

            const nextStation = neighbor.station;
            const nextLine = neighbor.line;

            if (!visited.has(nextStation)) {

                let interchangeCount = current.interchanges;

                if (
                    current.currentLine &&
                    current.currentLine !== nextLine
                ) {
                    interchangeCount++;
                }

                visited.add(nextStation);

                queue.push({
                    station: nextStation,
                    path: [...current.path, nextStation],
                    interchanges: interchangeCount,
                    currentLine: nextLine
                });
            }
        }
    }

    return null;
};

export { bfs };