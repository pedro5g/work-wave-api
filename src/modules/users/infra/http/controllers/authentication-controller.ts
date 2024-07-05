import { Request, Response } from 'express'
import { authentication } from '@users/infra/factory'
import { z } from 'zod'
import { AuthenticationError } from '@shared/errors/error'

export class AuthenticationController {
  public async auth(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email({ message: 'email is missing.' }),
      password: z
        .string()
        .min(6, { message: 'password needs at least 3 characters' }),
    })

    const { email, password } = bodySchema.parse(request.body)

    try {
      const { accessToken, refreshToken, user } = await authentication.login({
        email,
        password,
      })

      return response
        .cookie('refresh', refreshToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ userInfos: user, accessToken: accessToken })
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }

      throw error
    }
  }
}
