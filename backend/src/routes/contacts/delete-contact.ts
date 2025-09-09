import type { FastifyInstance } from 'fastify'
import { contactModel } from '@/db/actions/Contacts'
import { z } from 'zod'

export async function deleteContactRoute(fastify: FastifyInstance) {
  fastify.delete<{ Params: { id: string } }>(
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
      const existingContact = await contactModel.findById(contactId)
      if (!existingContact) {
        return reply.code(404).send({ error: 'Contact not found' })
      }
      await contactModel.delete(contactId)
      return reply.send({ message: 'Contact deleted successfully', contactId })
    }
  )
}
