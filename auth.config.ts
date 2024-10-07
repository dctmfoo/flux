import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core/types'

export const authOptions: AuthConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
}