import type { FastifyInstance } from 'fastify'
import { login } from './login'
import { authenticateParticipant } from './authenticate-participant'
import { register } from './register'

export async function authRoutes(app: FastifyInstance) {
  app.register(login)
  app.register(register)
  app.register(authenticateParticipant)
  return app
}
