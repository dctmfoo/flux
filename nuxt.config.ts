import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  future: { compatibilityVersion: 4 },

  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@sidebase/nuxt-auth'
  ],

  hub: {
    ai: true,
    blob: true
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single'
      }
    }
  },

  devtools: { enabled: true },

  vite: {
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.gif'],
  },

  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
    globalMiddlewareOptions: {
      allow: ['/', '/api/auth/**']
    },
    provider: {
      type: 'authjs',
    },
  },

  build: {
    transpile: [
      '@sidebase/nuxt-auth',
      'next-auth',
      '@auth/core',
      '@sidebase/nuxt-auth/dist/runtime/composables/nextAuth/useAuth'
    ],
  },

  runtimeConfig: {
    auth: {
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    basicAuth: {
      enabled: process.env.NODE_ENV === 'production',
      allowedRoutes: ['/api/_hub/'],
      users: [
        {
          username: process.env.USERNAME || 'admin',
          password: process.env.PASSWORD || 'admin'
        }
      ]
    }
  }
})