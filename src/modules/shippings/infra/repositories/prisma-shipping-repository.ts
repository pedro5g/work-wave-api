import { prisma } from '@shared/lib/prisma'
import {
  ICreateShipping,
  IDeleteShipping,
  IFindShippingById,
  IFindShippingByMetod,
  IShipping,
} from '../../domain/models/shipping-model'
import { IShippingRepository } from '../../domain/repositories/IShippings-repository'

export class ShippingRepository implements IShippingRepository {
  async createShipping(data: ICreateShipping): Promise<void> {
    await prisma.shipping.create({
      data,
    })
  }
  async deleteShipping({ id }: IDeleteShipping): Promise<void> {
    await prisma.shipping.delete({
      where: {
        id,
      },
    })
  }
  async findShipping({ id }: IFindShippingById): Promise<IShipping | null> {
    const shipping = await prisma.shipping.findUnique({
      where: {
        id,
      },
    })

    return shipping
  }
  async findShippingByMetod({
    metod,
  }: IFindShippingByMetod): Promise<IShipping | null> {
    const shipping = await prisma.shipping.findUnique({
      where: {
        metod,
      },
    })

    return shipping
  }

  async getShippings(): Promise<IShipping[]> {
    const shippings = await prisma.shipping.findMany()

    return shippings
  }
}
