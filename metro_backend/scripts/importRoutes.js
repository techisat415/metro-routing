import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const routes = [];

fs.createReadStream("./src/data/gtfs/routes.txt")
  .pipe(csv())

  .on("data", (row) => {

    routes.push({
      routeId: row.route_id,
      shortName: row.route_short_name,
      longName: row.route_long_name,
      routeType: row.route_type
        ? parseInt(row.route_type)
        : null,

      routeColor: row.route_color || null,
    });

  })

  .on("end", async () => {

    await prisma.route.createMany({
      data: routes,
      skipDuplicates: true,
    });

    console.log(`Imported ${routes.length} routes`);

    await prisma.$disconnect();
  });