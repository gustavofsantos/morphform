import { NextPageContext } from "next"
import Head from "next/head"
import React from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  FormLabel,
  Text,
  RadioGroup,
  VStack,
  Radio
} from "@chakra-ui/react"
import { When } from "~/commons/components"
import { FormService } from "~/forms/services/form.service"
import produce from "immer"

const FormStateContext = React.createContext(null)

const FormStateProvider = ({ children }) => {
  const [state, setState] = React.useState({})

  return (
    <FormStateContext.Provider value={{ state, setState }}>
      {children}
    </FormStateContext.Provider>
  )
}

const useFormState = () => {
  const { state, setState } = React.useContext(FormStateContext)

  const getState = () => state

  const setFieldValue = ({ pageId, fieldName, value }) => {
    setState(
      produce(state, (draft) => {
        draft[pageId][fieldName] = value
      })
    )
  }

  const fieldValue = ({ pageId, fieldName }) => {
    return state[pageId]?.[fieldName] ?? undefined
  }

  return { getState, fieldValue, setFieldValue }
}

function FormPage({ form }) {
  const [pageIndex, setPageIndex] = React.useState(0)
  const handleNext = () => setPageIndex(pageIndex + 1)

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
      <Head>
        <title>{form.form.name}</title>
      </Head>
      <Container as="article" py="4">
        <Box
          as="form"
          encType="application/x-www-form-urlencoded"
          method="POST"
          action={`/api/forms/${form._id}/submit`}
        >
          {form.form.pages.map((page, index) => (
            <FormStepPage
              key={page.id}
              id={page.id}
              title={page.title}
              description={page.description}
              fields={page.fields}
              onNext={handleNext}
              isLast={index === form.form.pages.length - 1}
              isHidden={index !== pageIndex}
            />
          ))}

          <When value={pageIndex === form.form.pages.length - 1}>
            <Button type="submit">Submit</Button>
          </When>
        </Box>
      </Container>
    </Box>
  )
}

export default function WrappedFormPage(props) {
  return (
    <FormStateProvider>
      <FormPage {...props} />
    </FormStateProvider>
  )
}

function FormStepPage({ id, title, description, fields, isHidden, isLast, onNext }) {
  const { fieldValue, setFieldValue } = useFormState()
  return (
    <Box as="section" id={id} hidden={isHidden}>
      <Box as="section" pb="6">
        <Heading as="h2" pb="4">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Box>

      <FormControl as="fieldset" id={id} name={id}>
        {fields.map((field) => (
          <React.Fragment>
            <When value={field.type === "text"}>
              <FormControl id={`pages[${id}][${field.name}]`} isRequired>
                <Input
                  name={`pages[${id}][${field.label}]`}
                  placeholder={field.label}
                  /* value={fieldValue({ pageId: id, fieldName: field.label })}
                  onChange={(ev) =>
                    setFieldValue({
                      pageId: id,
                      fieldName: field.label,
                      value: ev.target.value
                    })
                  } */
                  type="text"
                />
              </FormControl>
            </When>
            <When value={field.type === "single-option"}>
              {() => (
                <FormControl as="fieldset" isRequired>
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup
                    name={`pages[${id}][${field.label}]`}
                    /* value={fieldValue({ pageId: id, fieldName: field.label })}
                    onChange={(value) =>
                      setFieldValue({
                        pageId: id,
                        fieldName: field.label,
                        value
                      })
                    } */
                  >
                    <VStack>
                      {field.options.map((optionName) => (
                        <Radio key={optionName} value={optionName}>
                          {optionName}
                        </Radio>
                      ))}
                    </VStack>
                  </RadioGroup>
                </FormControl>
              )}
            </When>
          </React.Fragment>
        ))}
      </FormControl>

      <br />

      <When value={!isLast}>
        <Button type="button" variant="ghost" onClick={onNext}>
          Next
        </Button>
      </When>
    </Box>
  )
}

export async function getServerSideProps(ctx: NextPageContext) {
  const formId = ctx.query.formId
  const document = await FormService.findById(formId as string)

  const form = {
    _id: document._id.toString(),
    ownerId: document.ownerId.toString(),
    form: document.form
  }

  return {
    props: {
      form
    }
  }
}
