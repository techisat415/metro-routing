-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "stationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "line" TEXT NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_stationId_key" ON "Station"("stationId");
