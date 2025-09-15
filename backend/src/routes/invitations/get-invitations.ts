import type { FastifyInstance } from 'fastify'
import { invitationModel } from '@/db/actions/Invitations'

export async function getInvitationsRoute(fastify: FastifyInstance) {
  fastify.get(
    '/events/:id/invitations',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const { id: eventId } = request.params as { id: string }
        const invitations = await invitationModel.findByEvent(eventId)
        return reply.send({
          success: true,
          message: 'Invitations retrieved successfully',
          data: invitations,
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.status(401).send({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : 'Failed to get invitations',
        })
      }
    }
  )
}
