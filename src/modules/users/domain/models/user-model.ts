import { unknown } from 'zod'
import { Roles } from './roles'

export type User = {
  id: string
  name: string
  email: string
  password: string
  registeredAt: Date
  role: string
}

export type UserResponse = {
  id: string
  name: string
  email: string
  role: string
}

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

export interface IFindUserById {
  userId: string
}
export interface IFindUserByEmail {
  email: string
}
