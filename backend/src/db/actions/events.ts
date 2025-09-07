import { db } from '../db'
import { eq, desc } from 'drizzle-orm'
import { events } from '../schemas'
import { ICreateEventData, IEventData } from '../schemas/events'

class EventModel {
  async create(eventData: ICreateEventData): Promise<IEventData | undefined> {
    const {
      title,
      description,
      start_datetime,
      end_datetime,
      location,
      organizer_id,
      status,
    } = eventData

    const [newEvent] = await db
      .insert(events)
      .values({
        title,
        description,
        start_datetime: new Date(start_datetime),
        end_datetime: new Date(end_datetime),
        location,
        organizer_id,
        status: status ?? 'DRAFT',
      })
      .returning()

    return newEvent ? this.findById(newEvent.id) : undefined
  }

  async findById(id: string): Promise<IEventData | undefined> {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1)

    return event ?? undefined
  }

  async findByCreator(organizerId: string): Promise<IEventData[]> {
    const results = await db
      .select()
      .from(events)
      .where(eq(events.organizer_id, organizerId))
      .orderBy(desc(events.start_datetime))

    return results
  }

  async findAll(): Promise<IEventData[]> {
    const results = await db
      .select()
      .from(events)
      .orderBy(desc(events.start_datetime))

    return results
  }

  async update(
    id: string,
    eventData: Partial<IEventData>
  ): Promise<IEventData | undefined> {
    const {
      title,
      description,
      start_datetime,
      end_datetime,
      location,
      status,
    } = eventData

    const changes: Partial<typeof events.$inferInsert> = {
      updated_at: new Date(),
    }

    if (title != null) changes.title = title
    if (description != null) changes.description = description
    if (location != null) changes.location = location

    if (start_datetime != null)
      changes.start_datetime = new Date(start_datetime)
    if (end_datetime != null) changes.end_datetime = new Date(end_datetime)

    if (status != null) {
      if (
        status === 'PUBLISHED' ||
        status === 'DRAFT' ||
        status === 'FINISHED'
      ) {
        changes.status = status
      }
    }

    await db.update(events).set(changes).where(eq(events.id, id))

    return this.findById(id)
  }

  async delete(id: string): Promise<{ changes: number }> {
    const result = await db.delete(events).where(eq(events.id, id)).returning()
    return { changes: result.length }
  }
}

export const eventModel = new EventModel()
