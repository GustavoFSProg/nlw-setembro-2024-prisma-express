-- CreateTable
CREATE TABLE "Goals" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desiredWeeklyFrequency" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
