import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'YKZ5wY5hKVn329BVzol1Yi1Qmgh0wg2+eJvj/UMyhFs=',
  // ... rest of your config
})