/*
  Warnings:

  - Added the required column `Id` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Hash" TEXT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Password_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Password" ("CreatedAt", "Hash", "IsActive", "UpdatedAt", "UserId") SELECT "CreatedAt", "Hash", "IsActive", "UpdatedAt", "UserId" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
