import { IShippingRepository } from '../domain/repositories/IShippings-repository'

export class GetShippingsService {
  constructor(private readonly repository: IShippingRepository) {}
  async getAll() {
    const shipping = await this.repository.getShippings()

    return shipping
  }
}
