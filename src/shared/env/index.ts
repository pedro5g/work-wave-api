import z from 'zod'

const environmentSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['dev', 'production']).default('dev'),
})

const _env = environmentSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables ❌', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
