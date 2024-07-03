import { Router } from 'express'
import { RegisterUserController } from '../controllers/register-user-controller'
import { AuthenticationController } from '../controllers/authentication-controller'
import { GetUserInfoController } from '../controllers/get-user-info-controller'
import { authMiddleware } from '@shared/middlewares/auth'
import { cookieVerify } from '@shared/middlewares/cookie-verify'
import { RefreshTokenController } from '../controllers/refresh-token-controller'
import { LogoutController } from '../controllers/logout-controller'
import { UpdateUserRoleController } from '../controllers/update-user-role-controller'
import { roleCheck } from '@shared/middlewares/role-check'
import { GetAllRegisteredUsersController } from '../controllers/get-all-registered-users-controller'

const registerUser = new RegisterUserController()
const authUser = new AuthenticationController()
const getInfoUser = new GetUserInfoController()
const getRefreshToken = new RefreshTokenController()
const logoutUser = new LogoutController()
const updateUserRole = new UpdateUserRoleController()
const getAllRegisteredUsers = new GetAllRegisteredUsersController()
const userRoutes = Router()

userRoutes.post('/register', registerUser.register)
userRoutes.post('/login', authUser.auth)
userRoutes.get('/info', authMiddleware, getInfoUser.get)
userRoutes.get('/refresh', cookieVerify, getRefreshToken.refresh)
userRoutes.get('/logout', logoutUser.logout)
userRoutes.put(
  '/update',
  [authMiddleware, roleCheck('ADMIN')],
  updateUserRole.update,
)
userRoutes.get(
  '/get-all',
  [authMiddleware, roleCheck('ADMIN')],
  getAllRegisteredUsers.get,
)

export { userRoutes }
