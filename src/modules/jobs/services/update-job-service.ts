import { IUpdateJob } from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'
import { NotFoundError, ValidationError } from '@shared/errors/error'
import { IShippingRepository } from '@shippings/domain/repositories/IShippings-repository'

export class UpdateJobService {
  constructor(
    private readonly repository: IJobsRepository,
    private readonly shippingRepository: IShippingRepository,
  ) {}

  async update({ jobId, ...data }: IUpdateJob) {
    const findJob = await this.repository.findJobById({ jobId })

    if (!findJob) {
      throw new NotFoundError('Job not found.')
    }

    if (data.shipping) {
      const shippingList = await this.shippingRepository.getShippings()

      const hasExists = shippingList.findIndex(
        ({ metod }) => metod === data.shipping,
      )

      if (hasExists === -1) {
        throw new ValidationError('This shipping does not registered')
      }
    }

    await this.repository.updateJob({ jobId, ...data })
  }
}
