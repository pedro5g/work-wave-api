import { IRegisterUser, IUpdateRole, IUser } from '../models/user-interfaces'

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>
  findUserById(userId: string): Promise<IUser | null>
  registerUser(user: IRegisterUser): Promise<void>
  updateUserRole(user: IUpdateRole): Promise<void>
  getAllUsers(): Promise<IUser[]>
}
