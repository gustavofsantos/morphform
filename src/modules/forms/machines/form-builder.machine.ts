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
  pages: Record<string, FormPage>
}

export function createFormBuilderMachine(initialState = {}) {
  return createMachine<FormBuilderMachineContext>({
    id: "form-builder-machine",
    context: {
      id: uuidv4(),
      name: "",
      pages: {}
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
                return {
                  ...ctx.pages,
                  [newPage.id]: newPage
                }
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
                    page = ctx.pages[ev.data.pageId]
                }

                page.id = ctx.pages[ev.data.pageId].id
                return {
                  ...ctx.pages,
                  [page.id]: page
                }
              }
            })
          },
          SET_PAGE_TITLE: {
            actions: assign({
              pages: (ctx, ev) => {
                const page = produce(ctx.pages[ev.data.pageId], (draft) => {
                  draft.title = ev.data.title
                })

                return {
                  ...ctx.pages,
                  [page.id]: page
                }
              }
            })
          },
          SET_PAGE_DESCRIPTION: {
            actions: assign({
              pages: (ctx, ev) => {
                const page = produce(ctx.pages[ev.data.pageId], (draft) => {
                  draft.description = ev.data.description
                })

                return {
                  ...ctx.pages,
                  [page.id]: page
                }
              }
            })
          }
        }
      }
    }
  })
}
