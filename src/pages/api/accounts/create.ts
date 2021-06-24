import { NextApiHandler } from "next"
import { Accounts } from "~/accounts/accounts"

const handler: NextApiHandler = async (req, res) => {
  const { redirectTo } = req.query
  const { name, email, password } = req.body

  await Accounts.createUser({ name, email, password })

  if (redirectTo) {
    res.writeHead(307, "", { Location: redirectTo })
  } else {
    res.writeHead(307, "", { Location: "/" })
  }

  res.end()
}

export default handler
