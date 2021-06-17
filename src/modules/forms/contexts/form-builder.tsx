import { useMachine } from "@xstate/react"
import { useSession } from "next-auth/client"
import { createContext, useContext, useEffect } from "react"
import { State } from "xstate"
import { useDebounce } from "~/commons/hooks/use-debounce"
import { useFormDraftMutation } from "../hooks/use-form-draft-mutation"
import {
  createFormBuilderMachine,
  FormBuilderMachineContext
} from "../machines/form-builder.machine"

interface FormBuilderContextType {
  state: State<FormBuilderMachineContext, any, any>
  send(params: any): void
}

const FormBuilderContext = createContext<FormBuilderContextType>(null)

export function FormBuilderProvider({ children, initialState = {} }) {
  const [state, send] = useMachine(createFormBuilderMachine(initialState))

  return (
    <FormBuilderContext.Provider value={{ state, send }}>
      {children}
    </FormBuilderContext.Provider>
  )
}

export function useFormBuilder() {
  const { state, send } = useContext(FormBuilderContext)
  const [session] = useSession()
  const debouncedContext = useDebounce(state.context, 2000)
  const mutation = useFormDraftMutation()

  const pages = Object.values(state.context.pages)

  const createPage = () => send({ type: "CREATE_PAGE" })

  const getPage = (pageId) => state.context.pages[pageId]

  const name = state.context.name
  const id = state.context.id

  const setFormName = ({ name }) =>
    send({
      type: "SET_FORM_NAME",
      data: { name }
    })

  const setPageType = ({ pageId, type }) =>
    send({ type: "SET_PAGE_TYPE", data: { pageId, type } })

  const setPageTitle = ({ pageId, title }) =>
    send({ type: "SET_PAGE_TITLE", data: { pageId, title } })

  const setPageDescription = ({ pageId, description }) =>
    send({ type: "SET_PAGE_DESCRIPTION", data: { pageId, description } })

  useEffect(() => {
    if (session?.user) {
      mutation.mutate({ email: session?.user?.email, formState: debouncedContext })
    }
  }, [debouncedContext, session])

  return {
    pages,
    name,
    formId: id,

    // functions
    getPage,
    createPage,
    setFormName,
    setPageType,
    setPageTitle,
    setPageDescription
  }
}
