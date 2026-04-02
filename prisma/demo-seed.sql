-- Demo Data for RealState4U
-- Insert sample users, properties, and related data
-- Uses INSERT IGNORE to skip duplicates on re-runs

-- Add demo users (password123 encrypted with bcryptjs)
-- Password hash: $2a$10$mIw0xROZMJgGbJPjLYmG/OZo4P3xSPcJbL0M8p0kJc4PpDzLqbS12
INSERT IGNORE INTO `User` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('user-admin-001', 'admin@realstate4u.com', '$2a$10$mIw0xROZMJgGbJPjLYmG/OZo4P3xSPcJbL0M8p0kJc4PpDzLqbS12', 'ADMIN', NOW(), NOW()),
('user-agent-001', 'agent@realstate4u.com', '$2a$10$mIw0xROZMJgGbJPjLYmG/OZo4P3xSPcJbL0M8p0kJc4PpDzLqbS12', 'AGENT', NOW(), NOW()),
('user-landlord-001', 'landlord@realstate4u.com', '$2a$10$mIw0xROZMJgGbJPjLYmG/OZo4P3xSPcJbL0M8p0kJc4PpDzLqbS12', 'LANDLORD', NOW(), NOW()),
('user-regular-001', 'user@realstate4u.com', '$2a$10$mIw0xROZMJgGbJPjLYmG/OZo4P3xSPcJbL0M8p0kJc4PpDzLqbS12', 'USER', NOW(), NOW());

-- Add demo user profiles
INSERT IGNORE INTO `Profile` (`id`, `userId`, `name`, `phone`, `country`, `city`, `createdAt`, `updatedAt`) VALUES
('profile-admin-001', 'user-admin-001', 'Admin User', '+46701234567', 'Sweden', 'Stockholm', NOW(), NOW()),
('profile-agent-001', 'user-agent-001', 'John Agent', '+46701234568', 'Sweden', 'Stockholm', NOW(), NOW()),
('profile-landlord-001', 'user-landlord-001', 'Maria Landlord', '+43123456789', 'Austria', 'Vienna', NOW(), NOW()),
('profile-regular-001', 'user-regular-001', 'Jane Doe', '+48123456789', 'Poland', 'Warsaw', NOW(), NOW());

-- Add demo properties
INSERT IGNORE INTO `PropertyListing` (`id`, `slug`, `title`, `description`, `price`, `country`, `city`, `address`, `propertyType`, `listingType`, `marketCode`, `bedrooms`, `bathrooms`, `areaSqm`, `createdById`, `status`, `createdAt`, `updatedAt`) VALUES
('prop-sweden-001', 'modern-apartment-stockholm', 'Modern Apartment in Stockholm', 'Beautiful 2-bedroom apartment in the heart of Stockholm with modern amenities and great city views.', 1500000, 'Sweden', 'Stockholm', 'Södermalm District', 'APARTMENT', 'BUY', 'sweden', 2, 1, 75, 'user-agent-001', 'PUBLISHED', NOW(), NOW()),
('prop-eu-001', 'cozy-house-berlin', 'Cozy Family House in Berlin', 'Spacious 4-bedroom house with garden, perfect for families looking for a peaceful neighborhood.', 15000, 'Germany', 'Berlin', 'Charlottenburg', 'HOUSE', 'RENT', 'eu', 4, 2, 150, 'user-agent-001', 'PUBLISHED', NOW(), NOW()),
('prop-pk-001', 'luxury-villa-islamabad', 'Luxury Villa in Islamabad', '5-bedroom luxury villa with private garden, swimming pool, and modern security system.', 25000000, 'Pakistan', 'Islamabad', 'F-7 Sector', 'VILLA', 'BUY', 'pakistan', 5, 3, 500, 'user-landlord-001', 'PUBLISHED', NOW(), NOW()),
('prop-sweden-002', 'small-studio-apartment', 'Small Studio Apartment - Norrmalm', 'Cozy studio apartment perfect for singles or couples. Close to public transport and shopping.', 800000, 'Sweden', 'Stockholm', 'Norrmalm', 'APARTMENT', 'RENT', 'sweden', 1, 1, 35, 'user-agent-001', 'PUBLISHED', NOW(), NOW()),
('prop-eu-002', 'office-space-vienna', 'Professional Office Space in Vienna', 'Modern office space with all amenities, suitable for small to medium businesses.', 5000, 'Austria', 'Vienna', 'District 1', 'OFFICE', 'RENT', 'eu', 0, 2, 120, 'user-landlord-001', 'PUBLISHED', NOW(), NOW());

-- Add demo housing queue
INSERT IGNORE INTO `HousingQueue` (`id`, `propertyId`, `type`, `selectionMethod`, `createdAt`, `updatedAt`) VALUES
('queue-pk-001', 'prop-pk-001', 'QUEUE', 'First-come-first-served with preference points', NOW(), NOW());

-- Add demo leads/inquiries
INSERT IGNORE INTO `Lead` (`id`, `propertyId`, `userId`, `name`, `email`, `phone`, `message`, `source`, `createdAt`) VALUES
('lead-001', 'prop-sweden-001', 'user-regular-001', 'Jane Doe', 'jane@example.com', '+46701234567', 'Interested in this apartment, would like to schedule a viewing.', 'WEB', NOW()),
('lead-002', 'prop-eu-001', NULL, 'Michael Smith', 'michael@example.com', '+49301234567', 'Is the house available for immediate move-in?', 'WEB', NOW()),
('lead-003', 'prop-pk-001', NULL, 'Ahmed Khan', 'ahmed@example.com', '+923001234567', 'Interested in this villa. Please send more details and photos.', 'WHATSAPP', NOW());

-- Add demo housing applications
INSERT IGNORE INTO `HousingApplication` (`id`, `propertyId`, `userId`, `status`, `note`, `createdAt`, `updatedAt`) VALUES
('app-001', 'prop-pk-001', 'user-regular-001', 'PENDING', 'Application received and under review', NOW(), NOW()),
('app-002', 'prop-pk-001', 'user-agent-001', 'APPROVED', 'Highly qualified applicant', NOW(), NOW());