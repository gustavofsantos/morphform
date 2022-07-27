import { Box, Container } from "@chakra-ui/react"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"

function EditFormPage() {
  return (
    <Box>
      <Container>Edit form Page</Container>
    </Box>
  )
}

export default withAuthBarier(EditFormPage)
