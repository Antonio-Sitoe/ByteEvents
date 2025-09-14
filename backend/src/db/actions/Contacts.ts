import { db } from '../db'
import { asc, desc, eq, ilike, or } from 'drizzle-orm'
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
    const [row] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1)
    return row ?? undefined
  }

  async findByEmail(email: string): Promise<IContactData | undefined> {
    const [row] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.email, email))
      .limit(1)
    return row ?? undefined
  }

  async findAll(options?: {
    search?: string
    orderBy?: 'name' | 'created_at'
  }): Promise<IContactData[]> {
    const baseQuery = db.select().from(contacts)

    if (options?.search) {
      const like = `%${options.search}%`
      const searchQuery = baseQuery.where(
        or(ilike(contacts.name, like), ilike(contacts.email, like))
      )

      const orderBy = options?.orderBy || 'created_at'
      if (orderBy === 'name') {
        const rows = await searchQuery.orderBy(asc(contacts.name))
        return rows
      }
      const rows = await searchQuery.orderBy(desc(contacts.created_at))
      return rows
    }

    const orderBy = options?.orderBy || 'created_at'
    if (orderBy === 'name') {
      const rows = await baseQuery.orderBy(asc(contacts.name))
      return rows
    }
    const rows = await baseQuery
      .orderBy(desc(contacts.created_at))
      .where(eq(contacts.is_deleted, false))
    return rows
  }

  async update(
    id: string,
    contactData: Partial<{ name: string; email: string; phone?: string }>
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
    const deleted = await db
      .update(contacts)
      .set({ is_deleted: true })
      .where(eq(contacts.id, id))
      .returning()
    return { changes: deleted.length }
  }
}

export const contactModel = new ContactModel()
