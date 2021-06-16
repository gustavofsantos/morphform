import { signIn, signOut, useSession } from "next-auth/client"
import { Box, Container } from "@chakra-ui/react"
import { When } from "~/commons/components"

export default function HomePage() {
  const [session, isLoading] = useSession()

  const handleSignIn = () => signIn()
  const handleSignOut = () => signOut()

  return (
    <Box>
      <Container>
        <h1>Home page</h1>

        <When value={!session?.user && !isLoading}>
          <button onClick={handleSignIn}>Sign Up</button>
        </When>
        <When value={!!session?.user && !isLoading}>
          <button onClick={handleSignOut}>Log out</button>
        </When>
      </Container>
    </Box>
  )
}
