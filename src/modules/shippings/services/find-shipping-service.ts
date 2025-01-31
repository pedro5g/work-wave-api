import { NotFoundError } from '@shared/errors/error'
import { IFindShippingById } from '@shippings/domain/models/shipping-model'
import { IShippingRepository } from '@shippings/domain/repositories/IShippings-repository'

export class FindShippingService {
  constructor(private readonly repository: IShippingRepository) {}
  async find({ id }: IFindShippingById) {
    const shipping = await this.repository.findShipping({ id })

    if (!shipping) {
      throw new NotFoundError('Shipping not fund')
    }

    return shipping
  }
}
