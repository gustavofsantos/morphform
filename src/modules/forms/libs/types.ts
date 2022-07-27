export type FormField =
  | { type: "text"; label: string; placeholder: string }
  | { type: "text-area"; label: string; placeholder: string }
  | { type: "single-select"; label: string; placeholder: string; options: Array<string> }

export type FormPage = {
  id: string
  title: string
  description: string
  fields: Array<FormField>
}
