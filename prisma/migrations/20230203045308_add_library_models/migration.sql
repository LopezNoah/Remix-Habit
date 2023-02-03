/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `body` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Password` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `Body` to the `Note` table without a default value. This is not possible if the table is not empty.
  - The required column `Id` was added to the `Note` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `Title` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Hash` to the `Password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `Password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Password` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ReadingSession" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Guid" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "StartTime" DATETIME NOT NULL,
    "EndTime" DATETIME NOT NULL,
    "Duration" INTEGER NOT NULL,
    "PageStart" INTEGER NOT NULL,
    "PageEnd" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    CONSTRAINT "ReadingSession_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReadingSession_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Guid" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Tag_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Book" (
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
    "UserId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Group" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserId" INTEGER NOT NULL,
    "GroupId" INTEGER NOT NULL,
    CONSTRAINT "GroupMember_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupMember_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupType" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "BookLending" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "ReturnStatus" TEXT NOT NULL,
    "ReturnDate" DATETIME,
    "BookId" INTEGER NOT NULL,
    "LenderId" INTEGER NOT NULL,
    "BorrowerId" INTEGER NOT NULL,
    CONSTRAINT "BookLending_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookLending_LenderId_fkey" FOREIGN KEY ("LenderId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookLending_BorrowerId_fkey" FOREIGN KEY ("BorrowerId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Library" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Author" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rating" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Score" REAL NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    "BookId" INTEGER NOT NULL,
    CONSTRAINT "Rating_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Challenge" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Goal" TEXT NOT NULL,
    "Deadline" DATETIME NOT NULL,
    "Completed" BOOLEAN NOT NULL,
    "CompletionDate" DATETIME,
    "WinnerId" INTEGER NOT NULL,
    "GroupId" INTEGER NOT NULL,
    CONSTRAINT "Challenge_WinnerId_fkey" FOREIGN KEY ("WinnerId") REFERENCES "User" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Challenge_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Group" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BookToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author" ("Id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Body" TEXT NOT NULL,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Note_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
CREATE TABLE "new_Password" (
    "Hash" TEXT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Password_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("Id") ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
CREATE UNIQUE INDEX "Password_Hash_key" ON "Password"("Hash");
CREATE TABLE "new_User" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Bio" TEXT,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME NOT NULL,
    "InactivedAt" DATETIME
);
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ReadingSession_UserId_key" ON "ReadingSession"("UserId");

-- CreateIndex
CREATE INDEX "ReadingSession_UserId_idx" ON "ReadingSession"("UserId");

-- CreateIndex
CREATE INDEX "ReadingSession_BookId_idx" ON "ReadingSession"("BookId");

-- CreateIndex
CREATE INDEX "Tag_UserId_idx" ON "Tag"("UserId");

-- CreateIndex
CREATE INDEX "Book_UserId_idx" ON "Book"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Book_Title_UserId_key" ON "Book"("Title", "UserId");

-- CreateIndex
CREATE INDEX "GroupMember_UserId_idx" ON "GroupMember"("UserId");

-- CreateIndex
CREATE INDEX "GroupMember_GroupId_idx" ON "GroupMember"("GroupId");

-- CreateIndex
CREATE INDEX "BookLending_LenderId_idx" ON "BookLending"("LenderId");

-- CreateIndex
CREATE INDEX "BookLending_BorrowerId_idx" ON "BookLending"("BorrowerId");

-- CreateIndex
CREATE INDEX "BookLending_BookId_idx" ON "BookLending"("BookId");

-- CreateIndex
CREATE INDEX "Rating_UserId_idx" ON "Rating"("UserId");

-- CreateIndex
CREATE INDEX "Rating_BookId_idx" ON "Rating"("BookId");

-- CreateIndex
CREATE INDEX "Challenge_WinnerId_idx" ON "Challenge"("WinnerId");

-- CreateIndex
CREATE INDEX "Challenge_GroupId_idx" ON "Challenge"("GroupId");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToTag_AB_unique" ON "_BookToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToTag_B_index" ON "_BookToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");
