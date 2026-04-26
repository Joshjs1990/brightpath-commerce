import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    workerMode:
      (process.env.WORKER_MODE as 'shared' | 'worker' | 'server') || 'shared',
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:8000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'http://localhost:9000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
})
