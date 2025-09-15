import type { FastifyInstance } from 'fastify'
import { userModel } from '@/db/actions/User'

export async function login(fastify: FastifyInstance): Promise<void> {
  fastify.post('/login', async (request, reply) => {
    try {
      const { email, password } = request.body as {
        email: string
        password: string
      }

      const user = await userModel.findByEmail(email)
      if (!user) {
        return reply.code(401).send({
          error: 'Invalid credentials',
        })
      }

      const isValidPassword = await userModel.validatePassword(
        password,
        user.password_hash
      )
      if (!isValidPassword) {
        return reply.code(401).send({
          error: 'Invalid credentials',
        })
      }

      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
      })

      return reply.send({
        message: 'Login successful',
        user: userModel.toResponse(user),
        token,
      })
    } catch (error) {
      fastify.log.error(error)
      return reply.code(500).send({
        error: 'Internal server error',
      })
    }
  })
}
