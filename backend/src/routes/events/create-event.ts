import { eventModel } from '@/db/actions/events'
import type { FastifyInstance } from 'fastify'
import type { ICreateEventData } from '@/db/schemas/events'
import { createEventSchema } from '@/utils/schemas/events'
import { userModel } from '@/db/actions/User'

export async function createEvent(app: FastifyInstance) {
  app.post<{ Body: ICreateEventData }>(
    '/events',
    {
      schema: {
        body: createEventSchema,
      },
    },
    async (request, reply) => {
      try {
        const eventData = request.body
        const userId = request.body.organizer_id as string

        const user = await userModel.findById(userId)
        if (!user) {
          return reply.code(400).send({ error: 'Organizer not found' })
        }
        const event = await eventModel.create(eventData)

        if (!event) {
          return reply.code(500).send({ error: 'Failed to create event' })
        }

        return reply.code(201).send({
          message: 'Event created successfully',
          event,
        })
      } catch (error) {
        console.error(error)
        return reply.code(500).send({
          error: 'Internal server error',
        })
      }
    },
  )
}
