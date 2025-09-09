import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createSpeakerRoute } from './create-speaker'
import { getSpeakersByEventRoute } from './get-speakers-by-event'
import { getSpeakerByIdRoute } from './get-speaker-by-id'
import { updateSpeakerRoute } from './update-speaker'
import { deleteSpeakerRoute } from './delete-speaker'

async function speakerRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(createSpeakerRoute)
  await fastify.register(getSpeakersByEventRoute)
  await fastify.register(getSpeakerByIdRoute)
  await fastify.register(updateSpeakerRoute)
  await fastify.register(deleteSpeakerRoute)
}

export { speakerRoutes }
