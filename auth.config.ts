import GithubProvider from 'next-auth/providers/github'
import type { AuthOptions } from '@auth/core'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.AUTH_SECRET
}