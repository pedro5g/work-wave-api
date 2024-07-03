import { Request, Response } from 'express'

import { getUserInfos } from '@users/services/factory'
import { NotFoundError } from '@shared/errors/error'

export class GetUserInfoController {
  public async get(request: Request, response: Response) {
    const userId = request.user.id

    try {
      const { user } = await getUserInfos.get({ userId })

      return response.status(200).json({ user })
    } catch (error) {
      if (error instanceof NotFoundError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message })
      }

      throw error
    }
  }
}
