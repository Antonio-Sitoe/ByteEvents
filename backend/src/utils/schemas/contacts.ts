import z from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  phone: z.string().max(20).optional(),
  tags: z.array(z.string()).optional(),
})
