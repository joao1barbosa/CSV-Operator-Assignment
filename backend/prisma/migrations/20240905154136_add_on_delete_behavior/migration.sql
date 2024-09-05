-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_operatorId_fkey`;

-- AlterTable
ALTER TABLE `Client` MODIFY `operatorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_operatorId_fkey` FOREIGN KEY (`operatorId`) REFERENCES `Operator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
