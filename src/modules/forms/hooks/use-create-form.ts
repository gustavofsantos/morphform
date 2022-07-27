import axios from "axios"
import { useMutation } from "react-query"

const mutator = ({ form, userEmail }) =>
  axios
    .post("/api/forms/create", {
      userEmail,
      form
    })
    .then((res) => res.data)

export function useCreateForm() {
  return useMutation("createForm", mutator)
}
