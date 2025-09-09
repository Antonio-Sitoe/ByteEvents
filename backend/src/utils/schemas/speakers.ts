import { z } from 'zod'

export const CreateSpeakerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  topic: z
    .string()
    .min(3, 'Tópico deve ter pelo menos 3 caracteres')
    .max(200, 'Tópico deve ter no máximo 200 caracteres'),
  bio: z
    .string()
    .min(10, 'Biografia deve ter pelo menos 10 caracteres')
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres')
    .optional(),
  startTime: z.string({
    error: 'Data de início deve estar no formato ISO 8601',
  }),
  duration: z
    .number()
    .int()
    .min(15, 'Duração deve ser pelo menos 15 minutos')
    .max(480, 'Duração deve ser no máximo 480 minutos (8 horas)')
    .default(60),
  eventId: z.uuid({ error: 'ID do evento deve ser um UUID válido' }),
})

export const UpdateSpeakerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .optional(),
  topic: z
    .string()
    .min(3, 'Tópico deve ter pelo menos 3 caracteres')
    .max(200, 'Tópico deve ter no máximo 200 caracteres')
    .optional(),
  bio: z
    .string()
    .min(10, 'Biografia deve ter pelo menos 10 caracteres')
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres')
    .optional(),
  startTime: z.date('Data de início deve estar no formato ISO 8601').optional(),
  duration: z
    .number()
    .int()
    .min(15, 'Duração deve ser pelo menos 15 minutos')
    .max(480, 'Duração deve ser no máximo 480 minutos (8 horas)')
    .optional(),
  eventId: z.uuid('ID do evento deve ser um UUID válido').optional(),
})

export const SpeakerParamsSchema = z.object({
  id: z.uuid('ID deve ser um UUID válido'),
})

export const EventParamsSchema = z.object({
  eventId: z.uuid('ID do evento deve ser um UUID válido'),
})

export type CreateSpeakerData = z.infer<typeof CreateSpeakerSchema>
export type UpdateSpeakerData = z.infer<typeof UpdateSpeakerSchema>
export type SpeakerParams = z.infer<typeof SpeakerParamsSchema>
export type EventParams = z.infer<typeof EventParamsSchema>
