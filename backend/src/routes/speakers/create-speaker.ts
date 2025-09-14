import { eventModel } from '@/db/actions/events'
import { speakerModel } from '@/db/actions/Speaker'
import type { FastifyInstance } from 'fastify'

import {
  CreateSpeakerSchema,
  type CreateSpeakerData,
} from '@/utils/schemas/speakers'

export async function createSpeakerRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateSpeakerData }>(
    '/speakers',
    {
      schema: {
        body: CreateSpeakerSchema,
      },
    },
    async (request, reply) => {
      try {
        const speakerData = request.body
        const event = await eventModel.findById(speakerData.eventId)
        if (!event) {
          return reply.code(404).send({ error: 'Event not found' })
        }
        console.log('Associated event:', speakerData)
        const speaker = await speakerModel.create(speakerData)

        if (!speaker) {
          return reply.code(500).send({ error: 'Failed to create speaker' })
        }
        return reply.code(201).send({
          message: 'Speaker created successfully',
          speaker,
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({
          error: 'Internal server error, failed to create speaker',
          message: JSON.stringify(error),
        })
      }
    }
  )
}
