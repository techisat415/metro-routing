import fs from "fs";

const raw = fs.readFileSync("./src/data/stops.txt", "utf-8");

const lines = raw.split("\n");

const stops = lines
  .slice(1) // skip header
  .map(line => {
    const cols = line.split(",");
    return cols[2]?.trim();
  })
  .filter(Boolean);

// remove duplicates
const uniqueStops = [...new Set(stops)].sort();

fs.writeFileSync(
  "./src/data/stops.json",
  JSON.stringify(uniqueStops, null, 2)
);

console.log(`Converted ${uniqueStops.length} stops`);