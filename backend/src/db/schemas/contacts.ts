import {
  pgTable,
  uuid,
  text,
  timestamp,
  json,
  boolean,
} from 'drizzle-orm/pg-core'

export const contacts = pgTable('contacts', {
  id: uuid().primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  tags: json('tags').default([]),
  is_deleted: boolean('is_deleted').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

export type ICreateContactData = typeof contacts.$inferInsert
export type IContactData = typeof contacts.$inferSelect
