import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stops = [];

fs.createReadStream("./src/data/gtfs/stops.txt")
  .pipe(csv())

  .on("data", (row) => {

    stops.push({
      stopId: row.stop_id,
      stopName: row.stop_name,
      stopLat: parseFloat(row.stop_lat),
      stopLon: parseFloat(row.stop_lon),
    });

  })

  .on("end", async () => {

    await prisma.stop.createMany({
      data: stops,
      skipDuplicates: true,
    });

    console.log(`Imported ${stops.length} stops`);

    await prisma.$disconnect();
  });