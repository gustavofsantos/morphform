import { Box, Container, Heading } from "@chakra-ui/react"
import { signOut, useSession } from "next-auth/client"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"
import { HeaderLoggedView } from "~/commons/components"

function AdminIndexPage() {
  const [session] = useSession()

  return (
    <Box>
      <Container>
        <HeaderLoggedView user={session?.user} onLogout={signOut} />
        <Heading as="h1">Admin</Heading>
      </Container>
    </Box>
  )
}

export default withAuthBarier(AdminIndexPage)
