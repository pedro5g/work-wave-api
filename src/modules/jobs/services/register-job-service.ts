import { ICreateJob } from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'
import { ValidationError } from '@shared/errors/error'
import { IShippingRepository } from '@shippings/domain/repositories/IShippings-repository'

export class RegisterJobService {
  constructor(
    private readonly jobRepository: IJobsRepository,
    private readonly shippingRepository: IShippingRepository,
  ) {}

  async register({
    jobName,
    description,
    companyName,
    shipping,
    authorId,
    status,
  }: ICreateJob) {
    const shippingList = await this.shippingRepository.getShippings()

    const hasExists = shippingList.findIndex(({ metod }) => metod === shipping)

    if (hasExists === -1) {
      throw new ValidationError('This shipping does not registered')
    }

    await this.jobRepository.createJob({
      jobName,
      companyName,
      description,
      shipping,
      status,
      authorId,
    })
  }
}
