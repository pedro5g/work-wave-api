import { Request, Response } from 'express'
import { getShippings } from '../../factory'

export class GetShippingsController {
  async getAll(request: Request, response: Response) {
    try {
      const shippings = await getShippings.getAll()

      response.status(200).json({ shippings: shippings })
      return response.status(201).json()
    } catch (error) {
      throw error
    }
  }
}
