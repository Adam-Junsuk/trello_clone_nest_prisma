/*
  Warnings:

  - Added the required column `CreatorId` to the `Columns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Columns` ADD COLUMN `CreatorId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ColumnUsers` (
    `ColumnId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ColumnId`, `UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Columns` ADD CONSTRAINT `Columns_CreatorId_fkey` FOREIGN KEY (`CreatorId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColumnUsers` ADD CONSTRAINT `ColumnUsers_ColumnId_fkey` FOREIGN KEY (`ColumnId`) REFERENCES `Columns`(`columnId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColumnUsers` ADD CONSTRAINT `ColumnUsers_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
