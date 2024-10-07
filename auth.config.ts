import GithubProvider from '@auth/core/providers/github'
import type { AuthConfig } from '@auth/core'

export const authOptions: AuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.AUTH_SECRET
}