import {
  ICreateShipping,
  IDeleteShipping,
  IFindShippingById,
  IFindShippingByMetod,
  IShipping,
} from '../models/shipping-model'

export interface IShippingRepository {
  createShipping(data: ICreateShipping): Promise<void>
  deleteShipping(data: IDeleteShipping): Promise<void>
  findShipping(data: IFindShippingById): Promise<IShipping | null>
  findShippingByMetod(data: IFindShippingByMetod): Promise<IShipping | null>
  getShippings(): Promise<IShipping[]>
}
