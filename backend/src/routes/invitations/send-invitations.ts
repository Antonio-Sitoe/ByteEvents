import type { FastifyInstance } from 'fastify'
import {
  sendInvitationsSchema,
  invitationParamsSchema,
  type SendInvitationsInput,
} from '@/utils/schemas/invitations'
import { emailQueue } from '@/lib/email/email-queue'
import { invitationModel } from '@/db/actions/Invitations'
import { eventModel } from '@/db/actions/events'
import { contactModel } from '@/db/actions/Contacts'
import { v4 as uuidv4 } from 'uuid'
import { ICreateInvitationData } from '@/db/schemas'

export async function sendInvitationsRoute(fastify: FastifyInstance) {
  fastify.post(
    '/events/:id/invitations',
    {
      schema: {
        params: invitationParamsSchema,
        body: sendInvitationsSchema,
      },
    },
    async (request, reply) => {
      try {
        const { id: eventId } = request.params as { id: string }
        const { emails, subject } = request.body as SendInvitationsInput
        const emailsList = []
        const emailsToSave = []
        const event = await eventModel.findById(eventId)
        console.log('Event found:', event)

        for await (const email of emails) {
          const contact = await contactModel.findByEmail(email)
          if (contact) {
            const ticket = `${uuidv4().slice(0, 8) + contact?.name}`
              .replace(/\s+/g, '')
              .trim()
              .toLowerCase()
            console.log(`Contact for email ${email}:`, contact)

            const data: ICreateInvitationData = {
              eventId,
              email,
              subject,
              token: ticket,
              status: 'pending',
            }

            emailsToSave.push(data)
            emailsList.push({
              name: 'send-email',
              data: {
                ...data,
                username: contact?.name || null,
                eventTitle: event?.title || null,
              },
            })
          }
        }

        await invitationModel.create(emailsToSave)

        try {
          await emailQueue.addBulk(emailsList)
          return reply.send({
            success: true,
            message: `Invitations sent successfully. ${emailsList.length} emails sent.`,
          })
        } catch (error) {
          fastify.log.error(error)
          reply
            .status(401)
            .send({ message: 'Erro ao adicionar e-mails à fila.' })
        }
      } catch (error) {
        fastify.log.error(error)

        if (error instanceof Error && error.message.includes('not found')) {
          return reply.status(404).send({
            success: false,
            message: error.message,
          })
        }
        return reply.status(400).send({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : 'Failed to send invitations',
        })
      }
    }
  )
}
