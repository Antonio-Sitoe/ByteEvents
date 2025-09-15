import { events } from '@/db/schemas'
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const speakers = pgTable('speakers', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  topic: text().notNull(),
  bio: text(),
  startTime: text().notNull(),
  duration: integer().notNull().default(60),
  eventId: uuid().references(() => events.id),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
})

export type Speaker = typeof speakers.$inferSelect
export type NewSpeaker = typeof speakers.$inferInsert
