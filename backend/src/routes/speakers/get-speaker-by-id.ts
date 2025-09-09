import type { FastifyInstance } from 'fastify'
import { speakerModel } from '@/db/actions/Speaker'
import { SpeakerParamsSchema, type SpeakerParams } from '@/utils/schemas/speakers'

export async function getSpeakerByIdRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: SpeakerParams }>(
    '/speakers/:id',
    {
      schema: {
        params: SpeakerParamsSchema,
      },
    },
    async (request, reply) => {
      try {
        const { id: speakerId } = request.params
        const speaker = await speakerModel.findById(speakerId)

        if (!speaker) {
          return reply.code(404).send({ error: 'Speaker not found' })
        }

        if (!speaker.eventId) {
          return reply.code(404).send({ error: 'Speaker has no associated event' })
        }

        return reply.send({ speaker })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({ error: 'Internal server error' })
      }
    },
  )
}
