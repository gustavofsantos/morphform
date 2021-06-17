import { v4 as uuidv4 } from "uuid"
import { FormPage } from "./types"

export const createDefaultTextPage = (): FormPage => ({
  id: uuidv4(),
  title: "Page title",
  description: "Page description",
  fields: [{ type: "text", label: "Label", placeholder: "Type here" }]
})

export const createDefaultTextAreaPage = (): FormPage => ({
  id: uuidv4(),
  title: "Page title",
  description: "Page description",
  fields: [{ type: "text-area", label: "Label", placeholder: "Type here" }]
})

export const createDefaultSingleSelectPage = (): FormPage => ({
  id: uuidv4(),
  title: "Page title",
  description: "Page description",
  fields: [
    {
      type: "single-select",
      label: "Label",
      placeholder: "Type here",
      options: ["Option 1", "Option 2"]
    }
  ]
})
