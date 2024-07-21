import { CreateShippingService } from '@shippings/services/create-shipping-service'
import { ShippingRepository } from '../repositories/prisma-shipping-repository'
import { DeleteShippingService } from '@shippings/services/delete-shipping-service'
import { FindShippingService } from '@shippings/services/find-shipping-service'
import { GetShippingsService } from '@shippings/services/get-shippings-service'

const repository = new ShippingRepository()

const createShipping = new CreateShippingService(repository)
const deleteShipping = new DeleteShippingService(repository)
const findShipping = new FindShippingService(repository)
const getShippings = new GetShippingsService(repository)

export { createShipping, deleteShipping, findShipping, getShippings }
