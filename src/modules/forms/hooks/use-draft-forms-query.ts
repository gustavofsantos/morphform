import { useQuery } from "react-query"

const fetcher = (userId) => fetch(`/api/forms/draft/list/${userId}`)

export function useDraftFormsQuery({ userId }) {
  return useQuery("draft-forms", () => fetcher(userId))
}
