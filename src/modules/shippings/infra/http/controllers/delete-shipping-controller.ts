import { Request, Response } from 'express'
import { z } from 'zod'
import { deleteShipping } from '../../factory'
import { NotFoundError } from '@shared/errors/error'

export class DeleteShippingController {
  async delete(request: Request, response: Response) {
    const querySchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = querySchema.parse(request.params)

    try {
      await deleteShipping.delete({ id })
      return response.status(200).json()
    } catch (error) {
      if (error instanceof NotFoundError) {
        return response.status(200).json()
      }
      throw error
    }
  }
}
