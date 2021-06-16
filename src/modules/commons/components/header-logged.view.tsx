import { User } from "next-auth"
import NextLink from "next/link"
import { Box, ListItem, UnorderedList, Link } from "@chakra-ui/react"

interface Props {
  user?: User
  onLogout(): void
}

export function HeaderLoggedView(props: Props) {
  return (
    <Box as="nav">
      <UnorderedList>
        <ListItem>
          <NextLink href="/admin/forms/new">
            <Link>Create</Link>
          </NextLink>
        </ListItem>
        <ListItem>
          <NextLink href="/admin/forms/responses">
            <Link>Responses</Link>
          </NextLink>
        </ListItem>
        <ListItem>
          <NextLink href="/admin/forms/archived">
            <Link>Archived</Link>
          </NextLink>
        </ListItem>
        <ListItem>
          <button onClick={props.onLogout}>Logout</button>
        </ListItem>
      </UnorderedList>
    </Box>
  )
}
