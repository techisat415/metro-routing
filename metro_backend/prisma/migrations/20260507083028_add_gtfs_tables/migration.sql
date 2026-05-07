/*
  Warnings:

  - You are about to drop the `Station` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Station";

-- CreateTable
CREATE TABLE "Stop" (
    "id" SERIAL NOT NULL,
    "stopId" TEXT NOT NULL,
    "stopName" TEXT NOT NULL,
    "stopLat" DOUBLE PRECISION NOT NULL,
    "stopLon" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "routeId" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "longName" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stop_stopId_key" ON "Stop"("stopId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_routeId_key" ON "Route"("routeId");
