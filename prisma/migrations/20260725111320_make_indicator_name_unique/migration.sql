/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Indicator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Indicator_name_key" ON "Indicator"("name");
