import type { FastifyInstance } from 'fastify'
import { contactModel } from '@/db/actions/Contacts'

export async function getContactsRoute(fastify: FastifyInstance) {
  fastify.get(
    '/contacts',
    {
      preHandler: fastify.authenticate,
    },
    async (_, reply) => {
      const contacts = await contactModel.findAll()
      return reply.send({ contacts })
    }
  )
}
