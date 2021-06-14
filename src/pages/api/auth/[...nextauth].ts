import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { getMongoUri, GithubConfig } from "~/config/env"

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: GithubConfig.id(),
      clientSecret: GithubConfig.secret()
    })
  ],
  database: getMongoUri()
})
