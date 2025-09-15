import type { FastifyInstance } from 'fastify'
import { userModel } from '../../db/actions/User'

export async function register(fastify: FastifyInstance): Promise<void> {
  fastify.post('/register', async (request, reply) => {
    try {
      const { name, email, password } = request.body as {
        name: string
        email: string
        password: string
      }

      const existingUser = await userModel.findByEmail(email)
      if (existingUser) {
        return reply.code(400).send({
          error: 'User already exists with this email',
        })
      }

      const user = await userModel.create({
        name,
        email,
        password,
        role: 'admin',
      })
      if (!user) {
        return reply.code(500).send({ error: 'Failed to create user' })
      }

      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
      })

      return reply.code(201).send({
        message: 'User created successfully',
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
