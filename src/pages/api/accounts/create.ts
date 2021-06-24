import { NextApiHandler } from "next"
import { Accounts } from "~/accounts/accounts"

const handler: NextApiHandler = async (req, res) => {
  const { redirect_to } = req.query
  const { name, email, password } = req.body

  await Accounts.createUser({ name, email, password })

  if (redirect_to) {
    res.writeHead(307, "", { Location: redirect_to })
  } else {
    res.writeHead(307, "", { Location: "/" })
  }

  res.end()
}

export default handler
