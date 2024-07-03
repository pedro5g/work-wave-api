import { NotFoundError } from '@shared/errors/error'
import { updateUserRole } from '@users/services/factory'
import { NextFunction, Request, Response } from 'express'

import z from 'zod'

export class UpdateUserRoleController {
  public async update(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      role: z.enum(['ADMIN', 'USER']),
    })

    try {
      const { userId, role } = bodySchema.parse(request.body)
      await updateUserRole.update({ userId, role })

      return response.status(200).json()
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
