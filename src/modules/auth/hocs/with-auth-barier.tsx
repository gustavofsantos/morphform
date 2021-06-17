import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function withAuthBarier(Component) {
  function Enhanced(props) {
    const [session, isLoading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !session && typeof window !== "undefined") {
        router.push("/")
      }
    }, [session, isLoading, router])

    if (isLoading) return <span>loading...</span>

    return <Component {...props} />
  }

  Enhanced.displayName = `withAuthBarier(${Component.displayName ?? Component.name})`

  return Enhanced
}
