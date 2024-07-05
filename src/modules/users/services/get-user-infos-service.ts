import { NotFoundError } from '@shared/errors/error'
import { IGetUserInfos } from '@users/domain/models/user-model'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class GetUserInfosServices {
  constructor(private readonly repository: IUserRepository) {}

  async get({ userId }: IGetUserInfos) {
    const findUser = await this.repository.findUserById({ userId })

    if (!findUser) {
      throw new NotFoundError('User not found')
    }

    const { id, name, role } = findUser

    return {
      user: { id: id, name: name, role: role },
    }
  }
}
