import type { FastifyRequest } from 'fastify'

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: string
  created_at: Date
  updated_at: Date
}

export interface CreateUserData {
  name: string
  email: string
  password: string
  role?: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
  role: string
  created_at: string
}

export interface JWTPayload {
  id: string
  email: string
}

export interface AuthenticatedRequest extends FastifyRequest {
  user: JWTPayload
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
