-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "routeColor" TEXT,
ADD COLUMN     "routeType" INTEGER,
ALTER COLUMN "shortName" DROP NOT NULL,
ALTER COLUMN "longName" DROP NOT NULL;
