/*
  Warnings:

  - A unique constraint covering the columns `[signupVerifyToken]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Users_signupVerifyToken_key` ON `Users`(`signupVerifyToken`);
