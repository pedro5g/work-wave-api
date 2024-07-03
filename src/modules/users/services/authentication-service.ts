import { env } from '@shared/env'
import { AuthenticationError } from '@shared/errors/error'
import { comparePasswords } from '@shared/lib/helpers'
import { IAuthentication } from '@users/domain/models/user-interfaces'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'
import jwt from 'jsonwebtoken'

export class AuthenticationService {
  constructor(private readonly repository: IUserRepository) {}

  async login({ email, password }: IAuthentication) {
    const findUser = await this.repository.findUserByEmail(email)

    if (!findUser) {
      throw new AuthenticationError()
    }

    const isMatched = await comparePasswords(password, findUser.password)

    if (!isMatched) {
      throw new AuthenticationError()
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

    const user = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    }

    return { accessToken, refreshToken, user }
  }
}
