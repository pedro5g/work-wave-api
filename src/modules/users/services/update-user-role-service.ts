import { NotFoundError } from '@shared/errors/error'
import { IUpdateRole } from '@users/domain/models/user-model'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class UpdateUserRoleService {
  constructor(private readonly repository: IUserRepository) {}

  async update({ userId, role }: IUpdateRole) {
    const user = await this.repository.findUserById({ userId })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    await this.repository.updateUserRole({ userId, role })
  }
}
