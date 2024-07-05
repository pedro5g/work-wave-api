import { prisma } from '@shared/lib/prisma'
import {
  IFindUserByEmail,
  IFindUserById,
  IRegisterUser,
  IUpdateRole,
  User,
  UserResponse,
} from '@users/domain/models/user-model'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class PrismaUserRepository implements IUserRepository {
  async registerUser(data: IRegisterUser): Promise<void> {
    await prisma.user.create({
      data,
    })
  }

  async updateUserRole({ role, userId }: IUpdateRole): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    })
  }

  async findUserByEmail({ email }: IFindUserByEmail): Promise<User | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return findUser
  }

  async findUserById({ userId }: IFindUserById): Promise<User | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return findUser
  }
  async getAllUsers(): Promise<UserResponse[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return users
  }
}
