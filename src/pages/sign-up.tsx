import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack
} from "@chakra-ui/react"

export default function SignUpPage() {
  return (
    <Box as="main">
      <Container py="8">
        <Heading pb="8">Sign up</Heading>

        <Box
          as="form"
          action="/api/accounts/create?redirect_to=/api/auth/signin"
          method="POST"
        >
          <VStack spacing="8" alignItems="flex-start">
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Type your name" type="text" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input name="email" placeholder="Type your email" type="email" />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" placeholder="Type your password" type="password" />
            </FormControl>

            <Button type="submit">Sign up</Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}
