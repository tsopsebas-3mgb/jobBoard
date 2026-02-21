/*
  Warnings:

  - You are about to drop the column `subdivision` on the `Job` table. All the data in the column will be lost.
  - Added the required column `neighborhood` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contractType" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "negotiable" BOOLEAN NOT NULL DEFAULT false,
    "publishDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    "publisherId" INTEGER NOT NULL,
    CONSTRAINT "Job_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("city", "contractType", "description", "domain", "employer", "id", "maxSalary", "minSalary", "negotiable", "publishDate", "publisherId", "status", "title") SELECT "city", "contractType", "description", "domain", "employer", "id", "maxSalary", "minSalary", "negotiable", "publishDate", "publisherId", "status", "title" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
