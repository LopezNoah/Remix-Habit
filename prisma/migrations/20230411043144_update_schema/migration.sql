/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Guid" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Title" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "StartDate" DATETIME,
    "EndDateGoal" DATETIME,
    "PageCount" INTEGER NOT NULL DEFAULT 0,
    "CurrentPage" INTEGER NOT NULL DEFAULT 0,
    "TimesRead" INTEGER NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Book_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Author", "CreatedAt", "CurrentPage", "EndDateGoal", "Guid", "Id", "IsActive", "PageCount", "StartDate", "TimesRead", "Title", "UpdatedAt", "UserId") SELECT "Author", "CreatedAt", "CurrentPage", "EndDateGoal", "Guid", "Id", "IsActive", "PageCount", "StartDate", "TimesRead", "Title", "UpdatedAt", "UserId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE INDEX "Book_UserId_idx" ON "Book"("UserId");
CREATE UNIQUE INDEX "Book_Title_UserId_key" ON "Book"("Title", "UserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
