import { IGetPublicJobs } from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'

export class GetPublicJobsService {
  constructor(private readonly repository: IJobsRepository) {}

  async get({ take, lastCursor }: IGetPublicJobs) {
    const jobsList = await this.repository.getPublicListJobs({
      take,
      lastCursor,
    })

    return { jobsList }
  }
}
