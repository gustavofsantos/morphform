import { useMutation } from "react-query"

const mutator = ({ email, formState }) =>
  fetch("/api/forms/draft/persist", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ email, formState })
  })

export function useFormDraftMutation() {
  return useMutation("mutate-draft-form", mutator)
}
