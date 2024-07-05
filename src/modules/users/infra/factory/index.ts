import { PrismaUserRepository } from '../repositories/prisma-user-repository'
import { RegisterUserService } from '@users/services/register-user-service'
import { AuthenticationService } from '@users/services/authentication-service'
import { GetUserInfosServices } from '@users/services/get-user-infos-service'
import { RefreshTokenService } from '@users/services/refresh-token-service'
import { UpdateUserRoleService } from '@users/services/update-user-role-service'
import { GetAllRegisteredUsersService } from '@users/services/get-all-registered-users-service'

const userRepository = new PrismaUserRepository()

const register = new RegisterUserService(userRepository)
const authentication = new AuthenticationService(userRepository)
const getUserInfos = new GetUserInfosServices(userRepository)
const getRefreshToken = new RefreshTokenService(userRepository)
const updateUserRole = new UpdateUserRoleService(userRepository)
const getAllRegisteredUsers = new GetAllRegisteredUsersService(userRepository)

export {
  register,
  authentication,
  getUserInfos,
  getRefreshToken,
  updateUserRole,
  getAllRegisteredUsers,
}
