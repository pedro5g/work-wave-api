import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRoutes } from '@users/infra/http/routes'
import { globalErrorHandle } from '@shared/errors/global-error-handle'
import { shippingRoutes } from 'src/modules/shippings/infra/http/routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/shipping', shippingRoutes)
app.use(globalErrorHandle)
export { app }
