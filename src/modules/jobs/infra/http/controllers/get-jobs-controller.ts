import { getJobs } from '@jobs/infra/factory'
import { Request, Response } from 'express'
import { z } from 'zod'

export class GetJobsController {
  public async get(request: Request, response: Response) {
    const querySchema = z.object({
      jn: z.string().optional(), // jn === JobName
      cn: z.string().optional(), // cn === company Name
      lastCursor: z.string().uuid().optional(),
      take: z.coerce.number().int(),
    })

    const { jn, cn, lastCursor, take } = querySchema.parse(request.query)

    try {
      const { data, metaData } = await getJobs.get({
        jobName: jn,
        companyName: cn,
        take,
        lastCursor,
      })

      return response.status(202).json({ data, metaData })
    } catch (error) {
      throw error
    }
  }
}
