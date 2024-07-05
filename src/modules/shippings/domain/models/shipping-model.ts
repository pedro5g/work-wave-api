export type IShipping = {
  id: string
  metod: string
}

export interface ICreateShipping {
  metod: string
}
export interface IDeleteShipping {
  id: string
}
export interface IFindShippingById {
  id: string
}
export interface IFindShippingByMetod {
  metod: string
}
