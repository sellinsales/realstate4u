-- Complete SQL Schema for phpMyAdmin
-- Convert from Prisma Schema to MySQL

-- Create User table
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(191) NOT NULL,
  `role` ENUM('USER','AGENT','LANDLORD','ADMIN') NOT NULL DEFAULT 'USER',
  `approvalStatus` ENUM('PENDING','APPROVED','REJECTED','SUSPENDED') NOT NULL DEFAULT 'APPROVED',
  `approvedAt` DATETIME(3),
  `emailVerifiedAt` DATETIME(3),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Profile table
CREATE TABLE IF NOT EXISTS `Profile` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL UNIQUE,
  `name` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(191),
  `country` VARCHAR(191),
  `city` VARCHAR(191),
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create PropertyListing table
CREATE TABLE IF NOT EXISTS `PropertyListing` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(191) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `price` DECIMAL(12, 2) NOT NULL,
  `country` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `address` VARCHAR(191),
  `latitude` FLOAT,
  `longitude` FLOAT,
  `propertyType` ENUM('APARTMENT','HOUSE','VILLA','OFFICE','PLOT','SHOP','ROOM') NOT NULL,
  `listingType` ENUM('BUY','RENT') NOT NULL,
  `marketCode` VARCHAR(191) NOT NULL,
  `locale` VARCHAR(191),
  `bedrooms` INT,
  `bathrooms` INT,
  `areaSqm` INT,
  `firstHand` BOOLEAN NOT NULL DEFAULT FALSE,
  `landlordSelection` VARCHAR(191),
  `contactPhone` VARCHAR(191),
  `whatsappPhone` VARCHAR(191),
  `createdById` VARCHAR(191) NOT NULL,
  `isVerified` BOOLEAN NOT NULL DEFAULT FALSE,
  `status` ENUM('DRAFT','PENDING','PUBLISHED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create PropertyMedia table
CREATE TABLE IF NOT EXISTS `PropertyMedia` (
  `id` VARCHAR(191) NOT NULL,
  `propertyId` VARCHAR(191) NOT NULL,
  `imageUrl` VARCHAR(191) NOT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`propertyId`) REFERENCES `PropertyListing`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Lead table
CREATE TABLE IF NOT EXISTS `Lead` (
  `id` VARCHAR(191) NOT NULL,
  `propertyId` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191),
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191),
  `phone` VARCHAR(191),
  `message` LONGTEXT NOT NULL,
  `source` ENUM('WEB','WHATSAPP','CALL') NOT NULL DEFAULT 'WEB',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`propertyId`) REFERENCES `PropertyListing`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create HousingQueue table
CREATE TABLE IF NOT EXISTS `HousingQueue` (
  `id` VARCHAR(191) NOT NULL,
  `propertyId` VARCHAR(191) NOT NULL UNIQUE,
  `type` ENUM('QUEUE','FIRSTCOME','RANDOM') NOT NULL,
  `selectionMethod` VARCHAR(191),
  `selectionNotes` LONGTEXT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`propertyId`) REFERENCES `PropertyListing`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create HousingApplication table
CREATE TABLE IF NOT EXISTS `HousingApplication` (
  `id` VARCHAR(191) NOT NULL,
  `propertyId` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `status` ENUM('PENDING','SHORTLISTED','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `note` LONGTEXT,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `propertyId_userId` (`propertyId`, `userId`),
  FOREIGN KEY (`propertyId`) REFERENCES `PropertyListing`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create EmailVerificationToken table
CREATE TABLE IF NOT EXISTS `EmailVerificationToken` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `tokenHash` VARCHAR(191) NOT NULL UNIQUE,
  `expiresAt` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `EmailVerificationToken_userId_idx` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create PasswordResetToken table
CREATE TABLE IF NOT EXISTS `PasswordResetToken` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `tokenHash` VARCHAR(191) NOT NULL UNIQUE,
  `expiresAt` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `PasswordResetToken_userId_idx` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
