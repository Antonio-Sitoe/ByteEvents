import { db } from '@/db/db'
import { desc, eq } from 'drizzle-orm'
import { speakers } from '@/db/schemas/speakers'
import type {
  CreateSpeakerData,
  UpdateSpeakerData,
} from '@/utils/schemas/speakers'

export class SpeakerModel {
  async create(speakerData: CreateSpeakerData) {
    const [speaker] = await db
      .insert(speakers)
      .values({
        name: speakerData.name,
        topic: speakerData.topic,
        bio: speakerData.bio,
        startTime: speakerData.startTime,
        duration: speakerData.duration,
        eventId: speakerData.eventId,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning()

    return speaker
  }

  async findById(id: string) {
    const [speaker] = await db
      .select()
      .from(speakers)
      .where(eq(speakers.id, id))
      .limit(1)
    return speaker
  }

  async findByEvent(eventId: string) {
    const speakerList = await db
      .select()
      .from(speakers)
      .where(eq(speakers.eventId, eventId))
      .orderBy(desc(speakers.created_at))

    return speakerList
  }

  async update(id: string, speakerData: UpdateSpeakerData) {
    const updateData: Partial<typeof speakers.$inferInsert> = {}

    if (speakerData.name !== undefined) updateData.name = speakerData.name
    if (speakerData.topic !== undefined) updateData.topic = speakerData.topic
    if (speakerData.bio !== undefined) updateData.bio = speakerData.bio
    if (speakerData.startTime !== undefined)
      updateData.startTime = speakerData.startTime
    if (speakerData.duration !== undefined)
      updateData.duration = speakerData.duration
    if (speakerData.eventId !== undefined)
      updateData.eventId = speakerData.eventId

    const [updatedSpeaker] = await db
      .update(speakers)
      .set({
        ...updateData,
        updated_at: new Date(),
      })
      .where(eq(speakers.id, id))
      .returning()

    return updatedSpeaker
  }

  async delete(id: string) {
    const [deletedSpeaker] = await db
      .delete(speakers)
      .where(eq(speakers.id, id))
      .returning()

    return deletedSpeaker
  }
}

export const speakerModel = new SpeakerModel()
