import { compare, hash } from 'bcryptjs'

export const createHash = async (password: string) => {
  return await hash(password, 10)
}
export const comparePasswords = async (
  password: string,
  passwordHash: string,
) => {
  return await compare(password, passwordHash)
}
