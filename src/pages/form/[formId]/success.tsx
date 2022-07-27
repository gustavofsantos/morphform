import { Box, Container, Heading, Text } from "@chakra-ui/react"

export default function FormAnswerSuccessPage() {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      width="full"
      height="full"
    >
      <Container as="article">
        <Heading color="green.700">Yay</Heading>
        <br />
        <Text>Thanks for your submission</Text>
      </Container>
    </Box>
  )
}
