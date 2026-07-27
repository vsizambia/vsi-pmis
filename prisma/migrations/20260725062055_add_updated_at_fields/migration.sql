/*
  Warnings:

  - You are about to drop the column `budget` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `title` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Directorate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Programme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_programmeId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "budget",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "progress",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Directorate" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
