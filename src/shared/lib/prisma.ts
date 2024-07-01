import { PrismaClient } from '@prisma/client'
import { env } from '@shared/env'

const prisma = new PrismaClient({
  log: env.NODE_ENV !== 'production' ? ['query'] : [],
})

export { prisma }
