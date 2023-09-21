/*
  Warnings:

  - Added the required column `CreatorId` to the `Boards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Boards` ADD COLUMN `CreatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BoardUsers` (
    `BoardId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    PRIMARY KEY (`BoardId`, `UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CardUsers` (
    `CardId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,

    PRIMARY KEY (`CardId`, `UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CardsToUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CardsToUsers_AB_unique`(`A`, `B`),
    INDEX `_CardsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Boards` ADD CONSTRAINT `Boards_CreatorId_fkey` FOREIGN KEY (`CreatorId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardUsers` ADD CONSTRAINT `BoardUsers_BoardId_fkey` FOREIGN KEY (`BoardId`) REFERENCES `Boards`(`boardId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BoardUsers` ADD CONSTRAINT `BoardUsers_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardUsers` ADD CONSTRAINT `CardUsers_CardId_fkey` FOREIGN KEY (`CardId`) REFERENCES `Cards`(`cardId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardUsers` ADD CONSTRAINT `CardUsers_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardsToUsers` ADD CONSTRAINT `_CardsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cards`(`cardId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CardsToUsers` ADD CONSTRAINT `_CardsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
