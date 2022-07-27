import { assign, createMachine } from "xstate"
import { v4 as uuidv4 } from "uuid"
import produce from "immer"
import { FormPage } from "../libs/types"
import {
  createDefaultSingleSelectPage,
  createDefaultTextAreaPage,
  createDefaultTextPage
} from "../libs/default-pages"

export type FormBuilderMachineContext = {
  id: string
  name: string
  pages: Array<FormPage>
}

export function createFormBuilderMachine(initialState = {}) {
  return createMachine<FormBuilderMachineContext>({
    id: "form-builder-machine",
    context: {
      id: uuidv4(),
      name: "",
      pages: []
    },
    initial: "building",
    states: {
      idle: {},
      building: {
        on: {
          CREATE_PAGE: {
            actions: assign({
              pages: (ctx, ev) => {
                const newPage = createDefaultTextPage()

                return [...ctx.pages, newPage]
              }
            })
          },
          SET_FORM_NAME: {
            actions: assign({
              name: (_, ev) => ev.data.name
            })
          },
          SET_PAGE_TYPE: {
            actions: assign({
              pages: (ctx, ev) => {
                return produce(ctx.pages, (draft) => {
                  let page
                  switch (ev.data.type) {
                    case "text":
                      page = createDefaultTextPage()
                      break
                    case "text-area":
                      page = createDefaultTextAreaPage()
                      break
                    case "single-select":
                      page = createDefaultSingleSelectPage()
                      break
                    default:
                      page = draft.find((page) => page.id === ev.data.pageId)
                  }
                  page.id = ev.data.pageId
                })
              }
            })
          },
          SET_PAGE_TITLE: {
            actions: assign({
              pages: (ctx, ev) => {
                return produce(ctx.pages, (draft) => {
                  const page = draft.find((page) => page.id === ev.data.pageId)
                  page.title = ev.data.title
                })
              }
            })
          },
          SET_PAGE_DESCRIPTION: {
            actions: assign({
              pages: (ctx, ev) => {
                return produce(ctx.pages, (draft) => {
                  const page = draft.find((page) => page.id === ev.data.pageId)
                  page.description = ev.data.description
                })
              }
            })
          },
          SET_PAGE_FIELD_LABEL: {
            actions: assign({
              pages: (ctx, ev) => {
                return produce(ctx.pages, (draft) => {
                  const page = draft.find((page) => page.id === ev.data.pageId)
                  page.fields[ev.data.fieldIndex].label = ev.data.label
                })
              }
            })
          }
        }
      }
    }
  })
}
