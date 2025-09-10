import type { FastifyInstance } from 'fastify'
import { speakerModel } from '@/db/actions/Speaker'
import { eventModel } from '@/db/actions/events'
import {
  SpeakerParamsSchema,
  UpdateSpeakerSchema,
  type SpeakerParams,
  type UpdateSpeakerData,
} from '@/utils/schemas/speakers'

export async function updateSpeakerRoute(fastify: FastifyInstance) {
  fastify.put<{
    Params: SpeakerParams
    Body: UpdateSpeakerData
  }>(
    '/speakers/:id',
    {
      schema: {
        params: SpeakerParamsSchema,
        body: UpdateSpeakerSchema,
      },
    },
    async (request, reply) => {
      try {
        const { id: speakerId } = request.params
        const speakerData = request.body

        const existingSpeaker = await speakerModel.findById(speakerId)
        if (!existingSpeaker) {
          return reply.code(404).send({ error: 'Speaker not found' })
        }

        if (!existingSpeaker.eventId) {
          return reply.code(404).send({ error: 'Speaker has no associated event' })
        }

        const event = await eventModel.findById(existingSpeaker.eventId)
        if (!event) {
          return reply.code(404).send({ error: 'Event not found' })
        }

        const speaker = await speakerModel.update(speakerId, speakerData)
        if (!speaker) {
          return reply.code(500).send({ error: 'Failed to update speaker' })
        }

        return reply.send({
          message: 'Speaker updated successfully',
          speaker,
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({ error: 'Internal server error, failed to update speaker' })
      }
    },
  )
}
