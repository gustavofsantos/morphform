import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"

const client = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
