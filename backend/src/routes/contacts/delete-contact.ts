import type { FastifyInstance } from 'fastify'
import { contactModel } from '@/db/actions/Contacts'

export async function deleteContactRoute(fastify: FastifyInstance) {
  fastify.delete<{ Params: { id: string } }>(
    '/contacts/:id',
    {
      preHandler: fastify.authenticate,
    },
    async (request, reply) => {
      try {
        const contactId = request?.params?.id
        console.log(contactId)
        const existingContact = await contactModel.findById(contactId)
        console.log(existingContact)
        if (!existingContact) {
          return reply.code(404).send({ error: 'Contact not found' })
        }
        await contactModel.delete(contactId)
        return reply.send({
          message: 'Contact deleted successfully',
          contactId,
        })
      } catch (error) {
        fastify.log.error(error)
        return reply.code(500).send({ error: 'Internal server error' })
      }
    }
  )
}
