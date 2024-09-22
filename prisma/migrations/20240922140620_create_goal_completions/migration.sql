-- CreateTable
CREATE TABLE "Goal_Completions" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "goalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
