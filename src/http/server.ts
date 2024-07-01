import { env } from '@shared/env'
import { app } from './app'

app.listen(env.PORT, () => {
  console.log(`Server is running at PORT ${env.PORT} 🚀`)
})
