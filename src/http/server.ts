import '../shared/config/module-alias'
import { env } from '@shared/env'
import { app } from './app'
import { prisma } from '@shared/lib/prisma'

enum ExitStatus {
  failure = 1,
  success = 0,
}
const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']

const server = app
  .listen(env.PORT, async () => {
    try {
      await prisma.$connect()
      console.log(`Server is running on PORT ${env.PORT} 🚀`)
    } catch (err) {
      console.error(`Error when to start app, error: ${err}`)
      process.exit(ExitStatus.failure)
    }
  })
  .on('error', err => {
    console.error(`Error when to start app, error: ${err}`)
    process.exit(ExitStatus.failure)
  })

exitSignals.forEach(signal => {
  process.on(signal, () => {
    console.info(`Event ${signal} received, server is exiting...`)
    server.close(async error => {
      if (error) {
        console.error(`Error when closing, error: ${error}`)
      }
      console.info('Start closing the database connection...')
      await prisma.$disconnect()
      console.log('Server exited successfully!')
      process.exit(ExitStatus.success)
    })
  })
})
