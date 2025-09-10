import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createContactRoute } from './create-contacts'
import { getContactByIdRoute } from './get-contact-by-id'
import { updateContactRoute } from './update-contact'
import { deleteContactRoute } from './delete-contact'
import { getContactsRoute } from './get-contact'

async function contactsRoutes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(createContactRoute)
  await fastify.register(getContactByIdRoute)
  await fastify.register(getContactsRoute)
  await fastify.register(updateContactRoute)
  await fastify.register(deleteContactRoute)
}

export { contactsRoutes }
