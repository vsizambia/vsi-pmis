-- CreateTable
CREATE TABLE "ProjectExpenditure" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reference" TEXT,
    "fundingSource" TEXT,
    "status" TEXT NOT NULL DEFAULT 'RECORDED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectExpenditure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectExpenditure_projectId_idx" ON "ProjectExpenditure"("projectId");

-- CreateIndex
CREATE INDEX "ProjectExpenditure_transactionDate_idx" ON "ProjectExpenditure"("transactionDate");

-- CreateIndex
CREATE INDEX "ProjectExpenditure_category_idx" ON "ProjectExpenditure"("category");

-- CreateIndex
CREATE INDEX "ProjectExpenditure_status_idx" ON "ProjectExpenditure"("status");

-- AddForeignKey
ALTER TABLE "ProjectExpenditure" ADD CONSTRAINT "ProjectExpenditure_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
