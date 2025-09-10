import { invitationParamsSchema } from '../schemas/invitations'

export const getInvitationStatsSwagger = {
  schema: {
    description: 'Get invitation statistics for an event',
    tags: ['Invitations'],
    params: invitationParamsSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              total: { type: 'number' },
              pending: { type: 'number' },
              accepted: { type: 'number' },
              declined: { type: 'number' },
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
