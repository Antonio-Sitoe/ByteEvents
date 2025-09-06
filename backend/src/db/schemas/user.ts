import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  password_hash: varchar('password_hash'),
  role: varchar('role').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})
