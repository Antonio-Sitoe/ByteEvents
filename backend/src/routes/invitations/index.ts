import type { FastifyInstance } from 'fastify'
import { sendInvitationsRoute } from './send-invitations'
import { acceptInvitationRoute } from './accept-invitation'
import { getInvitationStatsRoute } from './get-invitation-stats'
import { getRegistrationEvolution } from './get-registration-evotlution'

export function invitationRoutes(fastify: FastifyInstance) {
  fastify.register(sendInvitationsRoute)
  fastify.register(acceptInvitationRoute)
  fastify.register(getInvitationStatsRoute)
  fastify.register(getRegistrationEvolution)
}
