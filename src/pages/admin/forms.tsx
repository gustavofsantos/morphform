import { Box, Text } from "@chakra-ui/react"
import Link from "next/link"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"
import { When } from "~/commons/components"
import { useFormsQuery } from "~/forms/hooks/use-forms"

function FormsPage() {
  const formsQuery = useFormsQuery("gustavofsantos@outlook.com")
  console.log(formsQuery)

  return (
    <Box>
      <h1>Forms page</h1>

      <When value={formsQuery.isSuccess && formsQuery.data.length === 0}>
        <Text>No form yet</Text>
      </When>
      <When value={formsQuery.isSuccess && formsQuery.data.length > 0}>
        {() =>
          formsQuery.data.map((form) => (
            <Box key={form._id}>
              <Link href={`/admin/forms/edit/${form._id}`} passHref>
                <Text>{form.state.name}</Text>
              </Link>
            </Box>
          ))
        }
      </When>
    </Box>
  )
}

export default withAuthBarier(FormsPage)
