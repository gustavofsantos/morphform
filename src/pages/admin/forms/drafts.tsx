import { useSession } from "next-auth/client"
import { Box, Container } from "@chakra-ui/react"
import { useDraftFormsQuery } from "~/forms/hooks/use-draft-forms-query"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"

function DraftsPage() {
  const [session] = useSession()
  const draftsQuery = useDraftFormsQuery({ userId: session?.user?.email })

  return (
    <Box>
      <Container>
        <h1>List of all drafts</h1>
      </Container>
    </Box>
  )
}

export default withAuthBarier(DraftsPage)
