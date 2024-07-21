import { JobsRepository } from '../repositories/prisma-jobs-repository'

import { RegisterJobService } from '@jobs/services/register-job-service'
import { UpdateJobService } from '@jobs/services/update-job-service'
import { DeleteJobService } from '@jobs/services/delete-job-service'
import { GetJobsService } from '@jobs/services/get-jobs-service'
import { GetPublicJobsService } from '@jobs/services/get-public-jobs-service'
import { ShippingRepository } from '@shippings/infra/repositories/prisma-shipping-repository'

const jobsRepository = new JobsRepository()
const shippingRepository = new ShippingRepository()

const registerJob = new RegisterJobService(jobsRepository, shippingRepository)
const updateJob = new UpdateJobService(jobsRepository, shippingRepository)
const deleteJob = new DeleteJobService(jobsRepository)
const getJobs = new GetJobsService(jobsRepository)
const getPublicJobs = new GetPublicJobsService(jobsRepository)

export { registerJob, updateJob, deleteJob, getJobs, getPublicJobs }
