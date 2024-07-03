import { prisma } from '@shared/lib/prisma'
import {
  IRegisterUser,
  IUpdateRole,
  IUser,
} from '@users/domain/models/user-interfaces'
import { IUserRepository } from '@users/domain/repositories/IUser-repository'

export class PrismaUserRepository implements IUserRepository {
  async registerUser(data: IRegisterUser): Promise<void> {
    await prisma.user.create({
      data,
    })
  }

  async updateUserRole(user: IUpdateRole): Promise<void> {
    await prisma.user.update({
      where: {
        id: user.userId,
      },
      data: {
        role: user.role,
      },
    })
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!findUser) {
      return null
    }

    return findUser
  }

  async findUserById(userId: string): Promise<IUser | null> {
    const findUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!findUser) {
      return null
    }

    return findUser
  }
  async getAllUsers(): Promise<IUser[]> {
    const users = await prisma.user.findMany()
    return users
  }
}
