import { ValidationError } from '@shared/errors/error'
import { createHash } from '@shared/lib/helpers'
import { IRegisterUser } from '@users/domain/models/user-model'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class RegisterUserService {
  constructor(private readonly repository: IUserRepository) {}
  async execute({
    name,
    email,
    password,
  }: Omit<IRegisterUser, 'role'>): Promise<void> {
    const emailAlreadyExists = await this.repository.findUserByEmail({ email })

    if (emailAlreadyExists) {
      throw new ValidationError('Email already exists')
    }

    const passwordHash = await createHash(password)

    await this.repository.registerUser({
      name,
      email,
      password: passwordHash,
      role: 'USER',
    })
  }
}
