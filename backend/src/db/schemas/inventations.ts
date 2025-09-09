import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { events } from './events'
import { contacts } from './contacts'

export const invitationStatus = pgEnum('invitation_status', [
  'pending',
  'accepted',
  'declined',
])

export const inventations = pgTable('inventations', {
  id: uuid().primaryKey().defaultRandom(),
  eventId: uuid().references(() => events.id),
  contactEmail: text().references(() => contacts.email),
  token: text().notNull(),
  subject: text(),
  message: text(),
  status: invitationStatus('status').notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
})
