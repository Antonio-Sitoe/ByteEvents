import Fastify from 'fastify'
import { env } from './lib/env'
import cors from '@fastify/cors'

const app = Fastify()

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
})

app.get('/', (_, res) => {
  res.send('Hello World')
})

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(`Server is running on port http://localhost:${env.PORT}`)
  })
  .catch((err) => {
    app.log.error(err)
    process.exit(1)
  })
