/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `balance_history` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transaction_id` to the `balance_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balance_history" ADD COLUMN     "transaction_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "balance_history_transaction_id_key" ON "balance_history"("transaction_id");

-- AddForeignKey
ALTER TABLE "balance_history" ADD CONSTRAINT "balance_history_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
