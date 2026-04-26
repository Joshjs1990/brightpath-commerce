import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const paymentProviders = process.env.STRIPE_API_KEY
  ? [
      {
        resolve: "@medusajs/payment-stripe",
        id: "stripe",
        options: {
          apiKey: process.env.STRIPE_API_KEY,
        },
      },
    ]
  : []

module.exports = defineConfig({
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    workerMode: "server",
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: paymentProviders,
      },
    },
  ],
})
