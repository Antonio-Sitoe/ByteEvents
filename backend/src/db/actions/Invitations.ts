import { db } from '../db'
import { invitations, contacts } from '../schemas'
import { eq, and } from 'drizzle-orm'
import type { ICreateInvitationData } from '../schemas'

export class InvitationModel {
  async create(invitationsData: ICreateInvitationData[]) {
    try {
      const result = await db
        .insert(invitations)
        .values(invitationsData)
        .returning()
      return result
    } catch (error) {
      console.error('Error creating invitations:', error)
      throw error
    }
  }

  async updateStatus(
    eventId: string,
    token: string,
    status: 'pending' | 'accepted' | 'declined'
  ) {
    const [updated] = await db
      .update(invitations)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(
        and(eq(invitations.eventId, eventId), eq(invitations.token, token))
      )
      .returning()

    return updated || null
  }

  async findByEvent(eventId: string) {
    const result = await db
      .select({
        invitation: invitations,
        contact: contacts,
      })
      .from(invitations)
      .leftJoin(contacts, eq(invitations.email, contacts.email))
      .where(eq(invitations.eventId, eventId))
      .orderBy(invitations.createdAt)

    return result
  }

  async getStats(eventId: string) {
    const allInvitations = await this.findByEvent(eventId)

    return {
      total: allInvitations.length,
      pending: allInvitations.filter((i) => i.invitation.status === 'pending')
        .length,
      accepted: allInvitations.filter((i) => i.invitation.status === 'accepted')
        .length,
      declined: allInvitations.filter((i) => i.invitation.status === 'declined')
        .length,
    }
  }

  async delete(invitationId: string) {
    const [deleted] = await db
      .delete(invitations)
      .where(eq(invitations.id, invitationId))
      .returning()
    return deleted || null
  }
}

export const invitationModel = new InvitationModel()
