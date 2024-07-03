import { Request, Response } from 'express'

export class LogoutController {
  public async logout(request: Request, response: Response) {
    const refreshToken = request.cookies['refresh']
    if (!refreshToken) return response.status(204).send()
    response
      .clearCookie('refresh', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json()
  }
}
