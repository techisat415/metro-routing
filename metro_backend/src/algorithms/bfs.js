const bfs = (graph, source, destination, interchangeTimes) => {

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
                distance: 0,
                time: 0
            }
        ],
        totalTime: 0,
        currentLine: null
    });

    visited.add(source);

    while (queue.length > 0) {

        const current = queue.shift();

        const currentStation = current.station;

        if (currentStation === destination) {

            return {
                path: current.path,
                time: current.totalTime
            };
        }

        for (const neighbor of graph[currentStation]) {

            const nextStation = neighbor.station;
            const nextLine = neighbor.line;

            if (!visited.has(nextStation)) {
                visited.add(nextStation);

                let extraTime = 0;
                if (current.currentLine && current.currentLine !== nextLine) {
                    extraTime = interchangeTimes[currentStation] || 0;
                }

                const newPath = [
                    ...current.path,
                    {
                        station: nextStation,
                        line: nextLine,
                        distance: neighbor.distance || 0,
                        time: neighbor.time || 0
                    }
                ];

                const newTime = current.totalTime + (neighbor.time || 0) + extraTime;

                queue.push({
                    station: nextStation,
                    path: newPath,
                    totalTime: newTime,
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