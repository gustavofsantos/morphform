import { signIn } from "next-auth/client"

export default function HomePage() {
  const handleSignIn = () => signIn()

  return (
    <article>
      <h1>Home page</h1>

      <button onClick={handleSignIn}>Sign Up</button>
    </article>
  )
}
