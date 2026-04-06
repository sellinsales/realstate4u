ALTER TABLE `User`
  ADD COLUMN IF NOT EXISTS `approvalStatus` ENUM('PENDING','APPROVED','REJECTED','SUSPENDED') NOT NULL DEFAULT 'APPROVED' AFTER `role`,
  ADD COLUMN IF NOT EXISTS `approvedAt` DATETIME(3) NULL AFTER `approvalStatus`;

UPDATE `User`
SET
  `approvalStatus` = CASE
    WHEN `role` IN ('AGENT', 'LANDLORD') THEN 'APPROVED'
    ELSE 'APPROVED'
  END,
  `approvedAt` = CASE
    WHEN `approvedAt` IS NULL THEN NOW(3)
    ELSE `approvedAt`
  END
WHERE `approvalStatus` = 'APPROVED';
