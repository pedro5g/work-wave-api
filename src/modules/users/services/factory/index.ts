import { PrismaUserRepository } from '@users/infra/repositories/prisma-user-repository'
import { RegisterUserService } from '../register-user-service'
import { AuthenticationService } from '../authentication-service'
import { GetUserInfosServices } from '../get-user-infos-service'
import { RefreshTokenService } from '../refresh-token-service'
import { UpdateUserRoleService } from '../update-user-role-service'
import { GetAllRegisteredUsersService } from '../get-all-registered-users-service'

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
