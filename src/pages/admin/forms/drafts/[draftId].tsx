import { useRouter } from "next/router"
import { Box, Container } from "@chakra-ui/react"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"

function DraftFormPage() {
  const router = useRouter()

  return (
    <Box>
      <Container>
        <h1>Draft Page</h1>
      </Container>
    </Box>
  )
}

export default withAuthBarier(DraftFormPage)
