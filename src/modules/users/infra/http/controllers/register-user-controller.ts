import { Request, Response } from 'express'
import { register } from '@users/infra/factory'
import { z } from 'zod'
import { ValidationError } from '@shared/errors/error'

export class RegisterUserController {
  public async register(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(3, { message: 'name needs at least 3 characters' }),
      email: z.string().email({ message: 'email is missing.' }),
      password: z
        .string()
        .min(6, { message: 'password needs at least 3 characters' }),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    try {
      await register.execute({
        name,
        email,
        password,
      })

      return response.status(204).json()
    } catch (error) {
      if (error instanceof ValidationError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }

      throw error
    }
  }
}
