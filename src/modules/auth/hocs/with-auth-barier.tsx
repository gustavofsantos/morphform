import { useSession } from "next-auth/client"
import { useRouter } from "next/router"

export function withAuthBarier(Component) {
  function Enhanced(props) {
    const [session, isLoading] = useSession()
    const router = useRouter()

    if (isLoading) return <span>loading...</span>
    if (!isLoading && !session?.user) {
      router.push("/")
      return null
    }

    return <Component {...props} />
  }

  Enhanced.displayName = `withAuthBarier(${Component.displayName ?? Component.name})`

  return Enhanced
}
