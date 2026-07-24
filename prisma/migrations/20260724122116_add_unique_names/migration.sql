/*
  Warnings:

  - You are about to drop the column `status` on the `Programme` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Programme` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Directorate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Programme` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Programme" DROP COLUMN "status",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "budget" DOUBLE PRECISION,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Planned';

-- CreateIndex
CREATE UNIQUE INDEX "Directorate_name_key" ON "Directorate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Programme_name_key" ON "Programme"("name");
