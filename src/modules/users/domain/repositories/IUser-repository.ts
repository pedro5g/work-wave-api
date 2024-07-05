import {
  IFindUserByEmail,
  IFindUserById,
  IRegisterUser,
  IUpdateRole,
  User,
  UserResponse,
} from '../models/user-model'

export interface IUserRepository {
  findUserByEmail(data: IFindUserByEmail): Promise<User | null>
  findUserById(data: IFindUserById): Promise<User | null>
  registerUser(data: IRegisterUser): Promise<void>
  updateUserRole(data: IUpdateRole): Promise<void>
  getAllUsers(): Promise<UserResponse[]>
}
