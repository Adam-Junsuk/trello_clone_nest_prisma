/*
  Warnings:

  - Added the required column `signupVerifyToken` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Users` ADD COLUMN `signupVerifyToken` VARCHAR(191) NOT NULL;
