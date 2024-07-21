import { getPublicJobs } from '@jobs/infra/factory'
import { Request, Response } from 'express'
import { z } from 'zod'

export class GetPublicJobsController {
  public async get(request: Request, response: Response) {
    const querySchema = z.object({
      take: z.coerce.number().int(),
      lastCursor: z.string().uuid().optional(),
    })

    const { take, lastCursor } = querySchema.parse(request.query)

    const jobs = await getPublicJobs.get({ take, lastCursor })

    return response.status(202).json({ jobs: jobs })
  }
}
