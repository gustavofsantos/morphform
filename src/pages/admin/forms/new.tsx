import { Box, Button, Container, Heading, Input, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { withAuthBarier } from "~/auth/hocs/with-auth-barier"
import { FormBuilderProvider, useFormBuilder } from "~/forms/contexts/form-builder"
import { useCreateForm } from "~/forms/hooks/use-create-form"

function NewFormPage({ user }) {
  const router = useRouter()
  const pageId = router.query.pageId

  return (
    <FormBuilderProvider>
      <Box>
        <Container>
          <Heading as="h1">New Form Page</Heading>
          <FormPages />
          <Box as="article">
            <FormPageEditor pageId={pageId} />
            <MakePublic user={user} />
          </Box>
        </Container>
      </Box>
    </FormBuilderProvider>
  )
}

export default withAuthBarier(NewFormPage)

function MakePublic({ user }) {
  const { _context } = useFormBuilder()
  const router = useRouter()
  const mutation = useCreateForm()

  const handleCreate = () => mutation.mutate({ userEmail: user?.email, form: _context })

  useEffect(() => {
    if (mutation.isSuccess) {
      router.push("/admin/forms")
    }
  }, [mutation.isSuccess, router])

  return (
    <Button isLoading={mutation.isLoading} onClick={handleCreate}>
      Create
    </Button>
  )
}

function FormPages() {
  const { pages, name, createPage, setFormName } = useFormBuilder()

  return (
    <Box as="aside">
      <Button onClick={createPage} type="button">
        New page
      </Button>

      <Input
        placeholder="Form name"
        value={name}
        onChange={(ev) => setFormName({ name: ev.target.value })}
      />

      <Box>
        {pages.map((page) => (
          <Link key={page.id} href={`/admin/forms/new?pageId=${page.id}`} passHref>
            <Box>
              <Text>{page.title}</Text>
              <Text>{page.description}</Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

function FormPageEditor({ pageId }) {
  const { getPage, setPageTitle, setPageDescription, setFieldLabel } = useFormBuilder()
  const page = getPage(pageId)

  if (!page) return null

  return (
    <Box as="section">
      <Input
        value={page.title}
        onChange={(ev) => setPageTitle({ pageId, title: ev.target.value })}
      />
      <Input
        value={page.description}
        onChange={(ev) => setPageDescription({ pageId, description: ev.target.value })}
      />

      <Box>
        <Heading as="h4">Inputs</Heading>
        {page.fields.map((field, index) => (
          <Input
            key={`field-${index}`}
            placeholder="Label"
            value={field.label}
            onChange={(ev) =>
              setFieldLabel({ pageId, fieldIndex: index, label: ev.target.value })
            }
          />
        ))}
      </Box>
    </Box>
  )
}
