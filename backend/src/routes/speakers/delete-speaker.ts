import type { FastifyInstance } from 'fastify'
import { speakerModel } from '@/db/actions/Speaker'
import { eventModel } from '@/db/actions/events'
import {
  SpeakerParamsSchema,
  type SpeakerParams,
} from '@/utils/schemas/speakers'

export async function deleteSpeakerRoute(fastify: FastifyInstance) {
  fastify.delete<{ Params: SpeakerParams }>(
    '/speakers/:id',
    {
      schema: {
        params: SpeakerParamsSchema,
      },
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const { id: speakerId } = request.params

        const existingSpeaker = await speakerModel.findById(speakerId)
        if (!existingSpeaker) {
          return reply.code(404).send({ error: 'Speaker not found' })
        }

        if (!existingSpeaker.eventId) {
          return reply
            .code(404)
            .send({ error: 'Speaker has no associated event' })
        }

        const event = await eventModel.findById(existingSpeaker.eventId)
        if (!event) {
          return reply.code(404).send({ error: 'Event not found' })
        }

        await speakerModel.delete(speakerId)

        return reply.send({
          message: 'Speaker deleted successfully',
        })
      } catch (error) {
        fastify.log.error(error)
        return reply
          .code(500)
          .send({ error: 'Internal server error, failed to delete speaker' })
      }
    }
  )
}
