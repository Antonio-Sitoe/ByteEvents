import { z } from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({
  PORT: z
    .string()
    .transform((val) => Number.parseInt(val))
    .default(3333),
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JWT_SECRET: z.string(),
  FRONTEND_URL: z.url(),
  EMAIL_HOST: z.string().default('localhost'),
  EMAIL_PORT: z.string().default('6379').transform(Number),
  EMAIL_REDIS_PASSWORD: z.string().optional(),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
})

dotenv.config()
export const env = envSchema.parse(process.env)
