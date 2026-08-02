/*
  Warnings:

  - The `status` column on the `Programme` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Programme" DROP COLUMN "status",
ADD COLUMN     "status" "ProgrammeStatus" NOT NULL DEFAULT 'ACTIVE';
