import { IListJobs } from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'

export class GetJobsService {
  constructor(private readonly repository: IJobsRepository) {}

  async get({ jobName, companyName, take, lastCursor }: IListJobs) {
    return await this.repository.getJobs({
      jobName,
      companyName,
      take,
      lastCursor,
    })
  }
}
