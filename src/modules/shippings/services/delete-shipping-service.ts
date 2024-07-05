import { NotFoundError } from '@shared/errors/error'
import { IDeleteShipping } from '../domain/models/shipping-model'
import { IShippingRepository } from '../domain/repositories/IShippings-repository'

export class DeleteShippingService {
  constructor(private readonly repository: IShippingRepository) {}
  async delete({ id }: IDeleteShipping) {
    const shipping = await this.repository.findShipping({ id })

    if (!shipping) {
      throw new NotFoundError()
    }

    await this.repository.deleteShipping({ id })
  }
}
