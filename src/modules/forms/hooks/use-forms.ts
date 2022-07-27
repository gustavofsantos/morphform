import { useQuery } from "react-query"

const fetcher = ({ email }) => fetch(`/api/forms/find/${email}`).then((res) => res.json())

export function useFormsQuery(email: string) {
  return useQuery("forms", () => fetcher({ email }))
}
