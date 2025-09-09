import { users } from './user'
import { pgTable, text, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core'

export const eventStatus = pgEnum('event_status', ['DRAFT', 'PUBLISHED', 'FINISHED'])

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  organizer_id: uuid('organizer_id').references(() => users.id),
  start_datetime: timestamp('start_datetime').notNull(),
  end_datetime: timestamp('end_datetime').notNull(),
  status: eventStatus('status').notNull(),
  location: text('location').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

export type ICreateEventData = typeof events.$inferInsert
export type IEventData = typeof events.$inferSelect
