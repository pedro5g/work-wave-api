import {
  GetJobResponse,
  ICreateJob,
  IDeleteJob,
  IFindJobById,
  IGetPublicJobs,
  IListJobs,
  IUpdateJob,
  JobResponse,
} from '@jobs/domain/models/job-model'
import { IJobsRepository } from '@jobs/domain/repositories/ijobs-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@shared/lib/prisma'

export class JobsRepository implements IJobsRepository {
  async createJob(data: ICreateJob): Promise<void> {
    await prisma.job.create({
      data,
    })
  }

  async updateJob({ jobId, ...data }: IUpdateJob): Promise<void> {
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data,
    })
  }
  async deleteJob({ jobId }: IDeleteJob): Promise<void> {
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    })
  }
  async findJobById({ jobId }: IFindJobById): Promise<JobResponse | null> {
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    })

    return job
  }

  async getJobs({
    jobName,
    companyName,
    take,
    lastCursor,
  }: IListJobs): Promise<GetJobResponse> {
    const query: Prisma.JobFindManyArgs = {
      take: take,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor,
        },
      }), /// -> this scope is evaluates if the left side is truthy // that notation is called ...(logical AND short-circuit evaluation)
      where: {
        ...(jobName && {
          jobName: {
            contains: jobName,
            mode: 'insensitive',
          },
        }),
        ...(companyName && {
          companyName: {
            contains: companyName,
            mode: 'insensitive',
          },
        }),
      },
      select: {
        id: true,
        jobName: true,
        companyName: true,
        description: true,
        status: true,
        shipping: true,
        authorId: true,
      },
      orderBy: {
        jobName: 'asc',
      },
    }

    const jobs = await prisma.job.findMany(query)

    if (jobs.length < 1) {
      return {
        data: jobs,
        metaData: {
          lastCursor: null,
          hasNextPage: false,
        },
      }
    }

    const cursor = jobs[jobs.length - 1].id

    const nextPage = await prisma.job.count({
      // Same as before, limit the number of events returned by this query.
      take: take,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
    })

    return {
      data: jobs,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage > 0,
      },
    }
  }

  async getPublicListJobs({
    take,
    lastCursor,
  }: IGetPublicJobs): Promise<GetJobResponse> {
    const query: Prisma.JobFindManyArgs = {
      take: take,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor,
        },
      }),
      select: {
        id: true,
        jobName: true,
        description: true,
        status: true,
        shipping: true,
      },
      orderBy: {
        jobName: 'asc',
      },
    }

    const jobs = await prisma.job.findMany(query)

    if (jobs.length < 1) {
      return {
        data: jobs,
        metaData: {
          lastCursor: null,
          hasNextPage: false,
        },
      }
    }

    const cursor = jobs[jobs.length - 1].id

    const nextPage = await prisma.job.count({
      take,
      skip: 1,
      cursor: {
        id: cursor,
      },
    })

    return {
      data: jobs,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage > 0,
      },
    }
  }
}
