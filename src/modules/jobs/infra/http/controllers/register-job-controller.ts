import { registerJob } from '@jobs/infra/factory'
import { ValidationError } from '@shared/errors/error'
import { Request, Response } from 'express'
import { z } from 'zod'

export class RegisterJobController {
  public async register(request: Request, response: Response) {
    const bodySchema = z.object({
      jobName: z.string(),
      description: z.string(),
      companyName: z.string(),
      shipping: z.string(),
      status: z.boolean(),
    })

    const { jobName, description, companyName, shipping, status } =
      bodySchema.parse(request.body)
    const authorId = request.user.id

    try {
      await registerJob.register({
        jobName,
        companyName,
        description,
        shipping,
        status,
        authorId,
      })

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
