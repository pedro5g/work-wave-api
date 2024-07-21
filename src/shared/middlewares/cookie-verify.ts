import { env } from '@shared/env'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const cookieVerify = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const refreshToken = request.cookies['refresh']
  if (refreshToken) {
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, {}, (error, decode) => {
      if (error) {
        return response.status(403).json({
          message: 'Token is not valid',
        })
      } else if (typeof decode === 'object' && typeof decode.sub === 'object') {
        const { sub } = decode
        request.user = sub
        next()
      }
    })
  } else {
    return response.status(401).json({
      message: 'No Token, authorization denied',
      success: false,
    })
  }
}
