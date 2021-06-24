import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { Accounts } from "~/accounts/accounts"
import { getMongoUri, GithubConfig } from "~/config/env"

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: GithubConfig.id(),
      clientSecret: GithubConfig.secret()
    }),
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: { email: string; password: string }, req) {
        const user = await Accounts.findUserByEmailAndPassword(
          credentials.email,
          credentials.password
        )

        if (user) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          }
        } else {
          return null
        }
      }
    })
  ],
  database: getMongoUri(),
  session: {
    jwt: true
  }
})
