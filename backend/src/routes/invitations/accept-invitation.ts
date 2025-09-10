import type { FastifyInstance } from 'fastify'
import { invitationModel } from '@/db/actions/Invitations'

export async function acceptInvitationRoute(fastify: FastifyInstance) {
  fastify.post('/events/:id/accept', async (request, reply) => {
    try {
      const { id: eventId } = request.params as { id: string }
      const { token } = request.query as { token: string }

      const result = await invitationModel.updateStatus(
        eventId,
        token,
        'accepted'
      )
      console.log('Invitation accepted:', result)

      return reply.send({
        success: true,
        message: 'Presença confirmada com sucesso!',
        data: result,
      })
    } catch (error) {
      fastify.log.error(error)

      if (error instanceof Error) {
        if (
          error.message.includes('not found') ||
          error.message.includes('Invalid')
        ) {
          return reply.status(404).send({
            success: false,
            message: error.message,
          })
        }
      }

      return reply.status(400).send({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to accept invitation',
      })
    }
  })
}
