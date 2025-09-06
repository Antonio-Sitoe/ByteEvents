import { z } from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => parseInt(val))
    .default(3333),
  DATABASE_URL: z.string(),
})

dotenv.config()
export const env = envSchema.parse(process.env)
