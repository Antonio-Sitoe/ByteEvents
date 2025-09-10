import { db } from '../db'
import { asc, eq, ilike, or } from 'drizzle-orm'
import { contacts } from '../schemas'
import type { IContactData } from '../schemas/contacts'

export class ContactModel {
  async create(contactData: {
    name: string
    email: string
    phone?: string | undefined
    tags?: string[] | undefined
  }): Promise<IContactData | undefined> {
    const { name, email, phone, tags } = contactData

    const [inserted] = await db
      .insert(contacts)
      .values({ name, email, phone, tags, created_at: new Date() })
      .returning()

    return inserted ? this.findById(inserted?.id) : undefined
  }

  async findById(id: string): Promise<IContactData | undefined> {
    const [row] = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1)
    return row ?? undefined
  }

  async findByEmail(email: string): Promise<IContactData | undefined> {
    const [row] = await db.select().from(contacts).where(eq(contacts.email, email)).limit(1)
    return row ?? undefined
  }

  async findAll(): Promise<IContactData[]> {
    const rows = await db.select().from(contacts).orderBy(asc(contacts.name))
    return rows
  }

  async search(query: string): Promise<IContactData[]> {
    const like = `%${query}%`
    const rows = await db
      .select()
      .from(contacts)
      .where(or(ilike(contacts.name, like), ilike(contacts.email, like)))
      .orderBy(asc(contacts.name))
    return rows
  }

  async update(
    id: string,
    contactData: Partial<{ name: string; email: string; phone?: string }>,
  ): Promise<IContactData | undefined> {
    const changes: Partial<typeof contacts.$inferInsert> = {
      updated_at: new Date(),
    }
    if (contactData.name != null) changes.name = contactData.name
    if (contactData.email != null) changes.email = contactData.email
    if (contactData.phone !== undefined) changes.phone = contactData.phone

    await db.update(contacts).set(changes).where(eq(contacts.id, id))
    return this.findById(id)
  }

  async delete(id: string): Promise<{ changes: number }> {
    const deleted = await db.delete(contacts).where(eq(contacts.id, id)).returning()
    return { changes: deleted.length }
  }
}

export const contactModel = new ContactModel()
