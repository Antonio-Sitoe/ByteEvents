import { Database } from 'better-sqlite3';
import { JWTPayload } from './index';

declare module 'fastify' {
  interface FastifyInstance {
    db: Database.Database;
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }

  interface FastifyRequest {
    user: JWTPayload;
  }
}
