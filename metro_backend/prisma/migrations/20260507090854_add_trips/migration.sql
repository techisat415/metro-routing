-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "tripId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "serviceId" TEXT,
    "shapeId" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_tripId_key" ON "Trip"("tripId");
