import { CreateShippingService } from '../../services/create-shipping-service'
import { DeleteShippingService } from '../../services/delete-shipping-service'
import { FindShippingService } from '../../services/find-shipping-service'
import { GetShippingsService } from '../../services/get-shippings-service'
import { ShippingRepository } from '../repositories/prisma-shipping-repository'

const repository = new ShippingRepository()

const createShipping = new CreateShippingService(repository)
const deleteShipping = new DeleteShippingService(repository)
const findShipping = new FindShippingService(repository)
const getShippings = new GetShippingsService(repository)

export { createShipping, deleteShipping, findShipping, getShippings }
