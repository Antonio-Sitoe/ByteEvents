import type { FastifyInstance } from 'fastify'
import { invitationModel } from '@/db/actions/Invitations'

export async function getRegistrationEvolution(fastify: FastifyInstance) {
  fastify.get(
    '/events/:id/invitations/evolution',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const { id: eventId } = request.params as { id: string }

        const evolution =
          await invitationModel.getRegistrationsEvolution(eventId)

        return reply.send({
          message: 'Invitation statistics retrieved successfully',
          data: evolution,
        })
      } catch (error) {
        fastify.log.error(error)

        if (error instanceof Error) {
          if (error.message.includes('not found')) {
            return reply.status(404).send({
              message: error.message,
            })
          }
        }

        return reply.status(400).send({
          message:
            error instanceof Error
              ? error.message
              : 'Failed to get invitation statistics',
        })
      }
    }
  )
}
