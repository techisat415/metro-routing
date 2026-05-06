import fs from "fs";

const loadInterchangeTimes = () => {

    const interchangeTimes = {};

    const data = fs.readFileSync(
        "src/data/gtfs/interchange_times.txt",
        "utf-8"
    );

    data.split("\n").forEach((line) => {

        line = line.trim();

        if (!line || line.startsWith("#")) return;

        const parts = line.split("|");

        if (parts.length !== 2) return;

        const station = parts[0].trim();
        const time = Number(parts[1].trim());

        interchangeTimes[station] = time;
    });

    return interchangeTimes;
};

export { loadInterchangeTimes };