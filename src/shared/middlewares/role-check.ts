import { Request, Response, NextFunction } from 'express'
export const roleCheck = (roleToVerify: 'ADMIN' | 'USER') => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user

    if (roleToVerify !== role) {
      return response.status(401).send({
        message: 'Not authorized',
      })
    }
    next()
  }
}
