import { env } from '@shared/env'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization?.split(' ')[1]

  if (token) {
    jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET,

      {},
      (error, decode) => {
        if (error) {
          return response.status(403).json({
            message: 'Token is not valid',
          })
        } else if (
          typeof decode === 'object' &&
          typeof decode.sub === 'object'
        ) {
          const { sub } = decode
          request.user = sub
          next()
        }
      },
    )
  } else {
    return response.status(401).json({
      message: 'No Token, authorization denied',
      success: false,
    })
  }
}
