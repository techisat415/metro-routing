import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const trips = [];

fs.createReadStream("./src/data/gtfs/trips.txt")
  .pipe(csv())

  .on("data", (row) => {

    trips.push({
      tripId: row.trip_id,
      routeId: row.route_id,
      serviceId: row.service_id || null,
      shapeId: row.shape_id || null,
    });

  })

  .on("end", async () => {

    await prisma.trip.createMany({
      data: trips,
      skipDuplicates: true,
    });

    console.log(`Imported ${trips.length} trips`);

    await prisma.$disconnect();
  });