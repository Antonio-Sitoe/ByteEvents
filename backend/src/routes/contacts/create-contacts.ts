import type { FastifyInstance } from 'fastify'
import { contactModel } from '@/db/actions/Contacts'
import { contactSchema } from '@/utils/schemas/contacts'
import type { z } from 'zod'

export async function createContactRoute(fastify: FastifyInstance) {
  fastify.post<{ Body: z.infer<typeof contactSchema> }>(
    '/contacts',
    {
      schema: { body: contactSchema },
    },
    async (request, reply) => {
      const { name, email, phone, tags } = request.body
      const contactData = {
        name,
        email,
        ...(phone !== undefined ? { phone } : {}),
        ...(tags !== undefined ? { tags } : {}),
      }

      const existingContact = await contactModel.findByEmail(contactData.email)
      if (existingContact) {
        return reply
          .code(400)
          .send({ error: 'Contact already exists with this email' })
      }

      const contact = await contactModel.create(contactData)
      if (!contact) {
        return reply.code(500).send({ error: 'Failed to create contact' })
      }

      return reply
        .code(201)
        .send({ message: 'Contact created successfully', contact })
    }
  )
}
