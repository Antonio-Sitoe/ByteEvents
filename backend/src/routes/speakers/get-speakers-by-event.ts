import type { FastifyInstance } from 'fastify'
import { speakerModel } from '@/db/actions/Speaker'
import { eventModel } from '@/db/actions/events'
import { EventParamsSchema, type EventParams } from '@/utils/schemas/speakers'

export async function getSpeakersByEventRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: EventParams }>(
    '/speakers/event/:eventId',
    {
      schema: {
        params: EventParamsSchema,
      },
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const { eventId } = request.params
        const event = await eventModel.findById(eventId)
        if (!event) {
          return reply.code(404).send({ error: 'Event not found' })
        }
        const speakers = await speakerModel.findByEvent(eventId)
        return reply.send({ speakers })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({
          error: 'Internal server error, failed to get speakers by event',
        })
      }
    }
  )
}
