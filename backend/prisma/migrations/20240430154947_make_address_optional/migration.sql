-- DropIndex
DROP INDEX "users_firstName_lastName_idx";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT,
ALTER COLUMN "address" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
