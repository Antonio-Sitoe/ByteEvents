import { FastifyInstance } from 'fastify'
import { eventModel } from '../../db/actions/events'

export async function getAllEvent(fastify: FastifyInstance): Promise<void> {
  fastify.get('/events', async (_request, reply) => {
    try {
      const events = await eventModel.findAll()
      return reply.send(events)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Internal server error' })
    }
  })
}
