import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { deleteEvent } from './delete-event'
import { getAllEvent } from './get-all-event'
import { getOneEvent } from './get-one'
import { updateEvent } from './update-event'
import { createEvent } from './create-event'

export async function eventsRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  await app.register(createEvent)
  await app.register(getAllEvent)
  await app.register(getOneEvent)
  await app.register(updateEvent)
  await app.register(deleteEvent)
}
