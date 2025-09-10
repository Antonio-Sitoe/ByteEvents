import {
  acceptInvitationSchema,
  invitationQuerySchema,
  invitationParamsSchema,
} from '@/utils/schemas/invitations'

export const acceptInvitationSwagger = {
  schema: {
    description: 'Accept invitation and confirm participation (API endpoint)',
    tags: ['Invitations'],
    params: invitationParamsSchema,
    querystring: invitationQuerySchema,
    body: acceptInvitationSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              participant: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  eventId: { type: 'string' },
                  contactId: { type: 'string' },
                  email: { type: 'string' },
                  createdAt: { type: 'string' },
                },
              },
              qrCode: { type: 'string' },
              event: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  start_datetime: { type: 'string' },
                  end_datetime: { type: 'string' },
                  location: { type: 'string' },
                },
              },
            },
          },
        },
      },
      400: {
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
