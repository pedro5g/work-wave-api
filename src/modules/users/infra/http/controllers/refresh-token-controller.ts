import { NotFoundError } from '@shared/errors/error'
import { getRefreshToken } from '@users/services/factory'
import { Request, Response } from 'express'

export class RefreshTokenController {
  public async refresh(request: Request, response: Response) {
    const userId = request.user.id

    try {
      const { accessToken, refreshToken } =
        await getRefreshToken.refresh(userId)

      response.cookie('refresh', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      })
      return response.status(200).json({ accessToken: accessToken })
    } catch (error) {
      if (error instanceof NotFoundError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }

      throw error
    }
  }
}
