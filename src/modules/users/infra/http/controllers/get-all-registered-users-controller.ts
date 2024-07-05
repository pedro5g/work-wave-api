import { getAllRegisteredUsers } from '@users/infra/factory'
import { Request, Response } from 'express'

export class GetAllRegisteredUsersController {
  public async get(_request: Request, response: Response) {
    const users = await getAllRegisteredUsers.get()

    return response.status(200).json({ users_registered: users })
  }
}
