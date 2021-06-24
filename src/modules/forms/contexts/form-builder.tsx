import { createContext, useContext, useEffect } from "react"
import { State } from "xstate"
import { useMachine } from "@xstate/react"
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
  const pages = state.context.pages
  const _context = state.context

  const createPage = () => send({ type: "CREATE_PAGE" })

  const getPage = (pageId) => state.context.pages.find((page) => page.id === pageId)

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

  const setFieldLabel = ({ pageId, fieldIndex, label }) =>
    send({ type: "SET_PAGE_FIELD_LABEL", data: { pageId, fieldIndex, label } })

  const setPageDescription = ({ pageId, description }) =>
    send({ type: "SET_PAGE_DESCRIPTION", data: { pageId, description } })

  return {
    pages,
    name,
    formId: id,
    _context,

    // functions
    getPage,
    createPage,
    setFormName,
    setPageType,
    setPageTitle,
    setFieldLabel,
    setPageDescription
  }
}
