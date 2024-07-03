import { Request, Response } from 'express'
import { getAllRegisteredUsers } from '@users/services/factory'

export class GetAllRegisteredUsersController {
  public async get(_request: Request, response: Response) {
    const users = await getAllRegisteredUsers.get()

    return response.status(200).json({ users_registered: users })
  }
}
