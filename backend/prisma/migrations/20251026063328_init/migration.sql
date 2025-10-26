-- CreateEnum
CREATE TYPE "FrequencyUnit" AS ENUM ('HOURS', 'DAYS', 'WEEKS');

-- CreateTable
CREATE TABLE "Drug" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dosage" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "frequencyUnit" "FrequencyUnit" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrugSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drugId" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "taken" BOOLEAN NOT NULL DEFAULT false,
    "takenAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "DrugSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drug" ADD CONSTRAINT "Drug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrugSchedule" ADD CONSTRAINT "DrugSchedule_drugId_fkey" FOREIGN KEY ("drugId") REFERENCES "Drug"("id") ON DELETE CASCADE ON UPDATE CASCADE;
