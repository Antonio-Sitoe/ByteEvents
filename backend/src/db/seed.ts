import { db } from './db'
import { users } from './schemas'

export async function seed() {
  console.log('Seeding database...')

  await db.insert(users).values({
    name: 'Admin',
    email: 'admin@eventos.com',
    password_hash: 'admin123',
    role: 'admin',
  })
}

seed()
