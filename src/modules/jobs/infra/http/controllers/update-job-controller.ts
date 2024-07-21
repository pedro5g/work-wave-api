import { updateJob } from '@jobs/infra/factory'
import { NotFoundError, ValidationError } from '@shared/errors/error'
import { Request, Response } from 'express'
import { z } from 'zod'

export class UpdateJobController {
  public async update(request: Request, response: Response) {
    const requestSchema = z.object({
      params: z.object({
        jobId: z.string().uuid(),
      }),
      body: z.object({
        jobName: z.string().optional(),
        description: z.string().optional(),
        companyName: z.string().optional(),
        shipping: z.string().optional(),
        status: z.boolean().optional(),
      }),
    })

    const { params, body } = requestSchema.parse({
      params: request.params,
      body: request.body,
    })

    try {
      await updateJob.update({ jobId: params.jobId, ...body })

      return response.status(200).json()
    } catch (error) {
      if (error instanceof NotFoundError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }
      if (error instanceof ValidationError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }

      throw error
    }
  }
}
