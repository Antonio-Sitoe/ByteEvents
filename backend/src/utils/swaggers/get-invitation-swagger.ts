import { invitationParamsSchema } from '../schemas/invitations'

export const getOneInvitationSwagger = {
  schema: {
    description: 'Get all invitations for an event',
    tags: ['Invitations'],
    params: invitationParamsSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                invitation: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    eventId: { type: 'string' },
                    contactId: { type: 'string' },
                    email: { type: 'string' },
                    token: { type: 'string' },
                    status: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                  },
                },
                contact: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    createdAt: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      401: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
      404: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
        },
      },
    },
  },
}
