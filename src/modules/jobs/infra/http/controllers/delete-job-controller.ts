import { deleteJob } from '@jobs/infra/factory'
import { NotFoundError } from '@shared/errors/error'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeleteJobController {
  public async delete(request: Request, response: Response) {
    const paramsSchema = z.object({
      jobId: z.string().uuid(),
    })

    const { jobId } = paramsSchema.parse(request.params)

    try {
      await deleteJob.delete({ jobId })

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
