-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favourite" (
    "userId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "jobId"),
    CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favourite_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favourite" ("jobId", "userId") SELECT "jobId", "userId" FROM "Favourite";
DROP TABLE "Favourite";
ALTER TABLE "new_Favourite" RENAME TO "Favourite";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
