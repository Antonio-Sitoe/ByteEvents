import type { FastifyInstance } from 'fastify'
import { eventModel } from '../../db/actions/events'

export async function deleteEvent(fastify: FastifyInstance): Promise<void> {
  fastify.delete<{ Params: { id: string } }>(
    '/events/:id',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const eventId = request.params.id as string
        const existingEvent = await eventModel.findById(eventId)
        if (!existingEvent) {
          return reply.code(404).send({ error: 'Event not found' })
        }
        await eventModel.delete(eventId)
        return reply.send({
          message: 'Event deleted successfully',
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({ error: 'Internal server error' })
      }
    }
  )
}
