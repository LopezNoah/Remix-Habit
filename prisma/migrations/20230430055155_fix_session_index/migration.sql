-- DropIndex
DROP INDEX "ReadingSession_BookId_idx";

-- DropIndex
DROP INDEX "ReadingSession_UserId_idx";

-- CreateIndex
CREATE INDEX "ReadingSession_UserId_BookId_idx" ON "ReadingSession"("UserId", "BookId");
