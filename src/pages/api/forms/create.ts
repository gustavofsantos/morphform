import { NextApiHandler } from "next"
import { FormService } from "~/forms/services/form.service"

const handler: NextApiHandler = async (req, res) => {
  const { userEmail, form } = req.body

  await FormService.create(userEmail, form)

  res.status(201)
  res.end()
}

export default handler
