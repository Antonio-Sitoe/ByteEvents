import { invitationModel } from '@/db/actions/Invitations'
import type { FastifyInstance } from 'fastify'

export async function authenticateParticipant(fastify: FastifyInstance) {
  fastify.post('/authenticate-participant', async (request, reply) => {
    const { token } = request.body as {
      token: string
    }
    const participant = await invitationModel.findByToken(token)
    if (participant.length === 0) {
      return reply.code(401).send({ error: 'Participant not found' })
    }
    return reply.send({
      message: 'Participant authenticated successfully',
      participant,
    })
  })
}
