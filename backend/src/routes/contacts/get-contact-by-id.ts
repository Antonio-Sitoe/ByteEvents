import type { FastifyInstance } from 'fastify'
import { contactModel } from '@/db/actions/Contacts'
import { z } from 'zod'

export async function getContactByIdRoute(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>(
    '/contacts/:id',
    {
      schema: {
        params: {
          id: z.string(),
        },
      },
    },
    async (request, reply) => {
      const contactId = request.params.id
      const contact = await contactModel.findById(contactId)
      if (!contact) {
        return reply.code(404).send({ error: 'Contact not found' })
      }
      return reply.send({ contact })
    }
  )
}
