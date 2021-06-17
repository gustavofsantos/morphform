import { Box, Container } from "@chakra-ui/react"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"

function DraftsPage() {
  return (
    <Box>
      <Container>
        <h1>List of all drafts</h1>
      </Container>
    </Box>
  )
}

export default withAuthBarier(DraftsPage)
