import type { FastifyInstance } from 'fastify'
import { sendInvitationsRoute } from './send-invitations'
import { acceptInvitationRoute } from './accept-invitation'
import { getInvitationStatsRoute } from './get-invitation-stats'

export async function invitationRoutes(fastify: FastifyInstance) {
  await fastify.register(sendInvitationsRoute)
  await fastify.register(acceptInvitationRoute)
  await fastify.register(getInvitationStatsRoute)
}
