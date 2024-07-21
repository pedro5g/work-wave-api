import { Router } from 'express'
import { RegisterJobController } from '../controllers/register-job-controller'
import { UpdateJobController } from '../controllers/update-job-controller'
import { DeleteJobController } from '../controllers/delete-job-controller'
import { GetPublicJobsController } from '../controllers/get-public-jobs-controller'
import { authMiddleware } from '@shared/middlewares/auth'
import { roleCheck } from '@shared/middlewares/role-check'
import { GetJobsController } from '../controllers/get-jobs-controller'

const jobsRoutes = Router()

const registerJob = new RegisterJobController()
const updateJob = new UpdateJobController()
const deleteJob = new DeleteJobController()
const getJobs = new GetJobsController()
const getPublicJobs = new GetPublicJobsController()

jobsRoutes.post(
  '/register',
  [authMiddleware, roleCheck('ADMIN')],
  registerJob.register,
)
jobsRoutes.patch(
  '/update/:jobId',
  [authMiddleware, roleCheck('ADMIN')],
  updateJob.update,
)
jobsRoutes.delete(
  '/delete/:jobId',
  [authMiddleware, roleCheck('ADMIN')],
  deleteJob.delete,
)
jobsRoutes.delete(
  '/delete/:jobId',
  [authMiddleware, roleCheck('ADMIN')],
  deleteJob.delete,
)
jobsRoutes.get('/get-jobs', [authMiddleware, roleCheck('ADMIN')], getJobs.get)

jobsRoutes.get('/public/jobs', getPublicJobs.get)

export { jobsRoutes }
