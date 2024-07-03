import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class GetAllRegisteredUsersService {
  constructor(private readonly repository: IUserRepository) {}
  async get() {
    return await this.repository.getAllUsers()
  }
}
