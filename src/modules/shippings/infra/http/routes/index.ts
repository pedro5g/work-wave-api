import { Router } from 'express'
import { authMiddleware } from '@shared/middlewares/auth'
import { roleCheck } from '@shared/middlewares/role-check'
import { CreateShippingController } from '../controllers/create-shipping-controller'
import { DeleteShippingController } from '../controllers/delete-shipping-controller'
import { GetShippingsController } from '../controllers/get-shippings-controller'

const shippingRoutes = Router()
const createShipping = new CreateShippingController()
const deleteShipping = new DeleteShippingController()
const getShippings = new GetShippingsController()

shippingRoutes.post(
  '/create',
  [authMiddleware, roleCheck('ADMIN')],
  createShipping.create,
)
shippingRoutes.delete(
  '/delete/:id',
  [authMiddleware, roleCheck('ADMIN')],
  deleteShipping.delete,
)
shippingRoutes.get(
  '/get-all',
  [authMiddleware, roleCheck('ADMIN')],
  getShippings.getAll,
)

export { shippingRoutes }
