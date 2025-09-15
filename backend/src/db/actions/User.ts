import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../schemas/user'
import type {
  User,
  CreateUserData,
  UpdateUserData,
  UserResponse,
} from '../../@types'

export class UserModel {
  async create(userData: CreateUserData): Promise<User> {
    const { name, email, password, role = 'user' } = userData
    const hashedPassword = await bcrypt.hash(password, 10)

    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password_hash: hashedPassword,
        role,
      })
      .returning()

    if (!user) {
      throw new Error('Failed to create user')
    }

    return user
  }

  async findById(id: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return user
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  async update(
    id: string,
    userData: UpdateUserData
  ): Promise<User | undefined> {
    const updateData: Partial<typeof users.$inferInsert> = {
      updated_at: new Date(),
    }

    if (userData.name !== undefined) updateData.name = userData.name
    if (userData.email !== undefined) updateData.email = userData.email
    if (userData.role !== undefined) updateData.role = userData.role

    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning()

    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id))

    return (result.rowCount ?? 0) > 0
  }

  toResponse(user: User): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at.toISOString(),
    }
  }
}

export const userModel = new UserModel()
