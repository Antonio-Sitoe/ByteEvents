import { eventModel } from '../../db/actions/events'
import { IEventData } from '@/db/schemas'
import { FastifyInstance } from 'fastify'

export async function updateEvent(fastify: FastifyInstance): Promise<void> {
  fastify.put<{
    Params: { id: string }
    Body: Partial<IEventData>
  }>(
    '/events/:id',

    async (request, reply) => {
      try {
        const eventId = request.params.id as string
        const eventData = request.body

        const existingEvent = await eventModel.findById(eventId)
        if (!existingEvent) {
          return reply.code(404).send({ error: 'Event not found' })
        }

        const updatedEvent = await eventModel.update(eventId, eventData)
        if (!updatedEvent) {
          return reply.code(500).send({ error: 'Failed to update event' })
        }

        return reply.send({
          message: 'Event updated successfully',
          event: updatedEvent,
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({ error: 'Internal server error' })
      }
    }
  )
}
