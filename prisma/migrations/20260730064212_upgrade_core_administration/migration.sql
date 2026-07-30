/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Directorate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Directorate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_programmeId_fkey";

-- DropForeignKey
ALTER TABLE "Programme" DROP CONSTRAINT "Programme_directorateId_fkey";

-- AlterTable
ALTER TABLE "Beneficiary" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "number" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Directorate" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "designation" TEXT,
ADD COLUMN     "directorateId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Directorate_code_key" ON "Directorate"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_directorateId_fkey" FOREIGN KEY ("directorateId") REFERENCES "Directorate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programme" ADD CONSTRAINT "Programme_directorateId_fkey" FOREIGN KEY ("directorateId") REFERENCES "Directorate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indicator" ADD CONSTRAINT "Indicator_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
