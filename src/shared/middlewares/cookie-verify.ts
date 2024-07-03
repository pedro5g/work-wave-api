import { env } from '@shared/env'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

type JwtPayloadProps = {
  id: string
  name: string
  role: string
}

export const cookieVerify = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const refreshToken = request.cookies['refresh']
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,

      (error, decode) => {
        if (error) {
          return response.status(403).json({
            message: 'Token is not valid',
          })
        } else {
          const { sub } = decode
          request.user = sub as unknown as JwtPayloadProps
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
