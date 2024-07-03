export interface IUser {
  id: string
  name: string
  email: string
  password: string
  registeredAt: Date
  role: string
}

export type IUserResponse = Omit<IUser, 'password' | 'registeredAt'>

export type Roles = 'ADMIN' | 'USER'

export interface IRegisterUser {
  name: string
  email: string
  password: string
  role: Roles
}

export interface IUpdateRole {
  userId: string
  role: Roles
}

export interface IAuthentication {
  email: string
  password: string
}

export interface IGetUserInfos {
  userId: string
}
