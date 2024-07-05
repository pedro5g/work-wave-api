import { Request, Response } from 'express'
import { z } from 'zod'
import { createShipping } from '../../factory'
import { ValidationError } from '@shared/errors/error'

export class CreateShippingController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      metod: z
        .string()
        .max(15, { message: 'max size is 15 characters' })
        .transform(d => d.toLowerCase()),
    })

    const { metod } = bodySchema.parse(request.body)

    try {
      await createShipping.create({ metod })
      return response.status(201).json()
    } catch (error) {
      if (error instanceof ValidationError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }
      throw error
    }
  }
}
