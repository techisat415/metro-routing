import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rows = [];

fs.createReadStream("./src/data/gtfs/stop_times.txt")
  .pipe(csv())

  .on("data", (row) => {

    rows.push({
      tripId: row.trip_id,

      arrivalTime: row.arrival_time,
      departureTime: row.departure_time,

      stopId: row.stop_id,

      stopSequence: parseInt(row.stop_sequence),
    });

  })

  .on("end", async () => {

    const chunkSize = 1000;

    for (let i = 0; i < rows.length; i += chunkSize) {

      const chunk = rows.slice(i, i + chunkSize);

      await prisma.stopTime.createMany({
        data: chunk,
      });

      console.log(`Inserted ${i + chunk.length}`);
    }

    console.log("Finished importing stop_times");

    await prisma.$disconnect();
  });