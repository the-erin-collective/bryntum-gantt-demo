-- CreateTable
CREATE TABLE `Task` (
    `id` VARCHAR(191) NOT NULL,
    `parentId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `effort` DOUBLE NULL,
    `effortUnit` VARCHAR(191) NOT NULL DEFAULT 'hour',
    `duration` DOUBLE NULL,
    `durationUnit` VARCHAR(191) NOT NULL DEFAULT 'day',
    `percentDone` DOUBLE NOT NULL DEFAULT 0,
    `schedulingMode` VARCHAR(191) NULL,
    `note` VARCHAR(191) NOT NULL,
    `constraintType` VARCHAR(191) NULL,
    `constraintDate` DATETIME(3) NULL,
    `manuallyScheduled` INTEGER NOT NULL DEFAULT 1,
    `effortDriven` INTEGER NOT NULL DEFAULT 0,
    `inactive` INTEGER NOT NULL DEFAULT 0,
    `cls` VARCHAR(191) NULL,
    `iconCls` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `parentIndex` INTEGER NOT NULL DEFAULT 0,
    `expanded` INTEGER NOT NULL DEFAULT 0,
    `calendar` INTEGER NULL,
    `deadline` DATETIME(3) NULL,
    `direction` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dependency` (
    `id` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NULL,
    `to` VARCHAR(191) NULL,
    `type` INTEGER NOT NULL DEFAULT 2,
    `cls` VARCHAR(191) NULL,
    `lag` DOUBLE NOT NULL DEFAULT 0,
    `lagUnit` VARCHAR(191) NOT NULL DEFAULT 'day',
    `active` BOOLEAN NOT NULL,
    `fromSide` VARCHAR(191) NULL,
    `toSide` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resource` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `calendar` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResourceAssignment` (
    `id` VARCHAR(191) NOT NULL,
    `resource` VARCHAR(191) NOT NULL,
    `event` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
