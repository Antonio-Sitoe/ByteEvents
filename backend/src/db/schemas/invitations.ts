import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { events } from './events'
import { contacts } from './contacts'

export const invitationStatus = pgEnum('invitation_status', [
  'pending',
  'accepted',
  'declined',
])

export const invitations = pgTable('invitations', {
  id: uuid().primaryKey().defaultRandom(),
  eventId: uuid('event_id')
    .notNull()
    .references(() => events.id),
  email: text('email').references(() => contacts.email),
  token: text('token').notNull().unique(),
  subject: text().notNull(),
  status: invitationStatus('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type ICreateInvitationData = typeof invitations.$inferInsert
export type IInvitationData = typeof invitations.$inferSelect
