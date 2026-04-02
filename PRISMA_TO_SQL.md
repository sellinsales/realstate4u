# How Prisma Schema Converts to SQL

## Prisma to SQL Type Mapping

| Prisma | MySQL SQL |
|--------|-----------|
| `String` | `VARCHAR(191)` |
| `String @db.Text` | `LONGTEXT` |
| `Int` | `INT` |
| `Float` | `FLOAT` |
| `Decimal` | `DECIMAL(12, 2)` |
| `Boolean` | `BOOLEAN` (or `TINYINT(1)`) |
| `DateTime` | `DATETIME(3)` |
| `Enum` | `ENUM('VALUE1','VALUE2')` |
| `@id @default(cuid())` | `VARCHAR(191) PRIMARY KEY` |
| `@unique` | `UNIQUE` constraint |
| `@relation()` | `FOREIGN KEY` |
| `onDelete: Cascade` | `ON DELETE CASCADE` |
| `onDelete: SetNull` | `ON DELETE SET NULL` |

## Prisma Relations to Foreign Keys

### One-to-Many Relationship
```prisma
model User {
  id       String
  listings PropertyListing[] @relation("PropertyCreator")
}

model PropertyListing {
  createdById String
  createdBy   User @relation("PropertyCreator", fields: [createdById], references: [id], onDelete: Cascade)
}
```

Becomes in SQL:
```sql
ALTER TABLE PropertyListing ADD FOREIGN KEY (createdById) 
  REFERENCES User(id) ON DELETE CASCADE;
```

### One-to-One Relationship
```prisma
model User {
  id      String
  profile Profile?
}

model Profile {
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Becomes in SQL:
```sql
ALTER TABLE Profile ADD UNIQUE KEY (userId);
ALTER TABLE Profile ADD FOREIGN KEY (userId) 
  REFERENCES User(id) ON DELETE CASCADE;
```

### Many-to-Many with Implicit Junction Table
```prisma
// Prisma automatically creates junction table internally
// You don't need to manually create it for relations
```

## This Project's Schema Breakdown

Your schema has 7 tables:

1. **User** - Stores user accounts with roles
2. **Profile** - Extended user information (one-to-one with User)
3. **PropertyListing** - Property postings (many-to-one with User)
4. **PropertyMedia** - Images for properties (many-to-one with PropertyListing)
5. **Lead** - Inquiries about properties (many-to-one with PropertyListing & User)
6. **HousingQueue** - Queue settings per property (one-to-one with PropertyListing)
7. **HousingApplication** - User applications for queue housing (many-to-many via junction table)

## How to Use in phpMyAdmin

The complete SQL is in `prisma/schema.sql`. To execute:

1. Open phpMyAdmin on cPanel
2. Select database: `realstate4u_marketplace`
3. Click **SQL** tab
4. Copy entire `schema.sql` content
5. Paste into SQL editor
6. Click **Go**
7. All 7 tables will be created automatically

## Key Differences

**Prisma Advantage:**
- Type-safe queries in Node.js
- Automatic migrations
- Relations handled in code

**SQL Advantage:**
- Direct database access
- phpMyAdmin bulk operations
- Can run without Node.js
- Easier manual data inspection

**For this project:**
- Prisma is used in Node.js app (production)
- SQL is used for manual setup (one-time in phpMyAdmin)