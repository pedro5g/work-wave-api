import { env } from '@shared/env'
import { NotFoundError } from '@shared/errors/error'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'
import jwt from 'jsonwebtoken'

export class RefreshTokenService {
  constructor(private readonly repository: IUserRepository) {}

  async refresh(userId: string) {
    const findUser = await this.repository.findUserById(userId)

    if (!findUser) {
      throw new NotFoundError('User not found')
    }

    const accessToken = jwt.sign(
      {
        sub: {
          id: findUser.id,
          name: findUser.name,
          role: findUser.role,
        },
      },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10m' },
    )
    const refreshToken = jwt.sign(
      {
        sub: {
          id: findUser.id,
          name: findUser.name,
          role: findUser.role,
        },
      },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    )

    return { accessToken, refreshToken }
  }
}
