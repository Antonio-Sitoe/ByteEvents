import type { FastifyInstance } from 'fastify'
import { contactSchema } from '@/utils/schemas/contacts'
import type { z } from 'zod'
import { contactModel } from '@/db/actions/Contacts'

export async function updateContactRoute(fastify: FastifyInstance) {
  fastify.put<{ Params: { id: string }; Body: z.infer<typeof contactSchema> }>(
    '/contacts/:id',
    {
      schema: { body: contactSchema },
    },
    async (request, reply) => {
      const contactId = request.params.id
      const { name, email, phone, tags } = request.body
      const contactData = {
        name,
        email,
        ...(phone !== undefined ? { phone } : {}),
        ...(tags !== undefined ? { tags } : {}),
      }

      const existingContact = await contactModel.findById(contactId)

      if (!existingContact) {
        return reply.code(404).send({ error: 'Contact not found' })
      }

      const emailContact = await contactModel.findByEmail(contactData.email)
      if (emailContact && emailContact?.id !== contactId) {
        return reply
          .code(400)
          .send({ error: 'Email already taken by another contact' })
      }

      const contact = await contactModel.update(contactId, contactData)

      if (!contact) {
        return reply.code(500).send({ error: 'Failed to update contact' })
      }

      return reply.send({ message: 'Contact updated successfully', contact })
    }
  )
}
