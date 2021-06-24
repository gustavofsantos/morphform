import { signIn, signOut, useSession } from "next-auth/client"
import { Box, Container, Text } from "@chakra-ui/react"
import { When } from "~/commons/components"
import Link from "next/link"

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
          <Link href="/admin">
            <Text as="a">Dashboard</Text>
          </Link>
        </When>
      </Container>
    </Box>
  )
}
