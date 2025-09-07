import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  start_datetime: z.string({
    error: 'Data e hora de início são obrigatórias',
  }),
  end_datetime: z.string({
    error: 'Data e hora de fim são obrigatórias',
  }),
  location: z.string().min(2).max(200),
  organizer_id: z.uuid({
    error: 'ID do organizador é obrigatório',
  }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'FINISHED']),
})
