-- CreateTable
CREATE TABLE "StopTime" (
    "id" SERIAL NOT NULL,
    "tripId" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "stopId" TEXT NOT NULL,
    "stopSequence" INTEGER NOT NULL,

    CONSTRAINT "StopTime_pkey" PRIMARY KEY ("id")
);
