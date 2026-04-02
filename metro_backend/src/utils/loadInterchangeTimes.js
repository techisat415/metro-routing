import fs from "fs";

const interchangeTimes = {};

export const loadInterchangeTimes = () => {
    const data = fs.readFileSync("src/data/gtfs/interchange_times.txt", "utf-8");

    data.split("\n").forEach(line => {
        if (!line || line.startsWith("#")) return;

        const [station, time] = line.split("|");

        interchangeTimes[station.trim()] = Number(time.trim());
    });

    return interchangeTimes;
};

