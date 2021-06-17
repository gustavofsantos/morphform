import { useMutation } from "react-query"

const mutator = ({ email, formId }) =>
  fetch("/api/forms/draft/make-public", {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ email, formId })
  })

export function useMakeDraftPublicMutation() {
  return useMutation(useMakeDraftPublicMutation.name, mutator)
}
