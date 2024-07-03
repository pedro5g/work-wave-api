import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { env } from '@shared/env'

export const globalErrorHandle = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log('Error', error.message)
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
