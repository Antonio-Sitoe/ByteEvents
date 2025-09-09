import type { FastifyInstance } from 'fastify'
import { eventModel } from '../../db/actions/events'

export async function getOneEvent(fastify: FastifyInstance): Promise<void> {
  fastify.get<{ Params: { id: string } }>('/events/:id', async (request, reply) => {
    try {
      const eventId = request.params.id as string
      const event = await eventModel.findById(eventId)

      if (!event) {
        return reply.code(404).send({ error: 'Event not found' })
      }

      return reply.send(event)
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({ error: 'Internal server error' })
    }
  })
}
