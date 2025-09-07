import { z } from 'zod'

// Event schemas
export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres'),
  date: z.string().datetime('Data deve estar no formato ISO 8601'),
  location: z
    .string()
    .min(3, 'Local deve ter pelo menos 3 caracteres')
    .max(200, 'Local deve ter no máximo 200 caracteres'),
  maxParticipants: z
    .number()
    .int()
    .min(1, 'Máximo de participantes deve ser pelo menos 1')
    .max(10000, 'Máximo de participantes deve ser no máximo 10000'),
  price: z.number().min(0, 'Preço não pode ser negativo').optional(),
  category: z
    .string()
    .min(2, 'Categoria deve ter pelo menos 2 caracteres')
    .max(50, 'Categoria deve ter no máximo 50 caracteres'),
  status: z.enum(['draft', 'published', 'cancelled']).default('draft'),
})

export const UpdateEventSchema = z.object({
  title: z
    .string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .optional(),
  description: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional(),
  date: z.string().datetime('Data deve estar no formato ISO 8601').optional(),
  location: z
    .string()
    .min(3, 'Local deve ter pelo menos 3 caracteres')
    .max(200, 'Local deve ter no máximo 200 caracteres')
    .optional(),
  maxParticipants: z
    .number()
    .int()
    .min(1, 'Máximo de participantes deve ser pelo menos 1')
    .max(10000, 'Máximo de participantes deve ser no máximo 10000')
    .optional(),
  price: z.number().min(0, 'Preço não pode ser negativo').optional(),
  category: z
    .string()
    .min(2, 'Categoria deve ter pelo menos 2 caracteres')
    .max(50, 'Categoria deve ter no máximo 50 caracteres')
    .optional(),
  status: z.enum(['draft', 'published', 'cancelled']).optional(),
})

// Response schemas
export const EventResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  maxParticipants: z.number(),
  currentParticipants: z.number(),
  price: z.number().nullable(),
  category: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  organizerId: z.string(),
})

export const EventListResponseSchema = z.object({
  events: z.array(EventResponseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})

// Query schemas
export const EventQuerySchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(1))
    .default(() => 1),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().int().min(1).max(100))
    .default(() => 10),
  category: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
})

// Type exports
export type CreateEventData = z.infer<typeof CreateEventSchema>
export type UpdateEventData = z.infer<typeof UpdateEventSchema>
export type EventResponse = z.infer<typeof EventResponseSchema>
export type EventListResponse = z.infer<typeof EventListResponseSchema>
export type EventQuery = z.infer<typeof EventQuerySchema>
