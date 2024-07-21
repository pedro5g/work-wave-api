import {
  GetJobResponse,
  ICreateJob,
  IDeleteJob,
  IFindJobById,
  IGetPublicJobs,
  IListJobs,
  IUpdateJob,
  JobResponse,
} from '../models/job-model'

export interface IJobsRepository {
  createJob(data: ICreateJob): Promise<void>
  updateJob(data: IUpdateJob): Promise<void>
  deleteJob(data: IDeleteJob): Promise<void>
  findJobById(data: IFindJobById): Promise<JobResponse | null>
  getJobs(data: IListJobs): Promise<GetJobResponse>
  getPublicListJobs(data: IGetPublicJobs): Promise<GetJobResponse>
}
