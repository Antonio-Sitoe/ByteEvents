import { z } from 'zod'

export const sendInvitationsSchema = z.object({
  emails: z.array(z.email()).min(1, 'At least one email is required'),
  subject: z.string({ error: 'Subject is required' }),
})

export const acceptInvitationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email format'),
  phone: z.string().optional(),
})

export const invitationQuerySchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export const invitationParamsSchema = z.object({
  id: z.uuid('Invalid event ID format'),
})

export const invitationIdParamsSchema = z.object({
  invitationId: z.uuid('Invalid invitation ID format'),
})

export type SendInvitationsInput = z.infer<typeof sendInvitationsSchema>
export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>
export type InvitationQueryInput = z.infer<typeof invitationQuerySchema>
export type InvitationParamsInput = z.infer<typeof invitationParamsSchema>
export type InvitationIdParamsInput = z.infer<typeof invitationIdParamsSchema>
