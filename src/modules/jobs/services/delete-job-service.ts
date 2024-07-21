import { IDeleteJob } from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'
import { NotFoundError } from '@shared/errors/error'

export class DeleteJobService {
  constructor(private readonly repository: IJobsRepository) {}

  async delete({ jobId }: IDeleteJob) {
    const findJob = await this.repository.findJobById({ jobId })

    if (!findJob) {
      throw new NotFoundError('Job not found.')
    }

    await this.repository.deleteJob({ jobId })
  }
}
