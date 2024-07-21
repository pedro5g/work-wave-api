import { ValidationError } from '@shared/errors/error'
import { ICreateShipping } from '@shippings/domain/models/shipping-model'
import { IShippingRepository } from '@shippings/domain/repositories/IShippings-repository'

export class CreateShippingService {
  constructor(private readonly repository: IShippingRepository) {}
  async create({ metod }: ICreateShipping) {
    const findShipping = await this.repository.findShippingByMetod({ metod })

    if (findShipping) {
      throw new ValidationError('This method already exists')
    }

    await this.repository.createShipping({ metod })
  }
}
