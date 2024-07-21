export type Job = {
  id: string
  jobName: string
  companyName: string
  description: string
  status: boolean
  shipping: string
  authorId: string
  createdAt: string
  updatedAt: string
}
export type JobResponse = {
  id: string
  jobName: string
  companyName: string
  description: string
  status: boolean
  shipping: string
  authorId: string
}

export type GetJobResponse = {
  data: JobResponse[]
  metaData: {
    lastCursor: string | null
    hasNextPage: boolean
  }
}

export type PublicJobsResponse = {
  id: string
  jobName: string
  description: string
  status: boolean
  shipping: string
}

export interface IGetPublicJobs {
  take: number
  lastCursor?: string
}

export interface ICreateJob {
  jobName: string
  companyName: string
  description: string
  status: boolean
  shipping: string
  authorId: string
}

export interface IUpdateJob {
  jobId: string
  jobName?: string
  companyName?: string
  description?: string
  status?: boolean
  shipping?: string
}

export interface IDeleteJob {
  jobId: string
}

export interface IFindJobById {
  jobId: string
}

export interface IListJobs {
  jobName?: string
  companyName?: string
  take: number
  lastCursor?: string
}
