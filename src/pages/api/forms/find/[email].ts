import { Cursor } from "mongodb"
import { NextApiHandler } from "next"
import { FormService } from "~/forms/services/form.service"

const handler: NextApiHandler = async (req, res) => {
  const allForms = await FormService.list(req.query.email as string)
  const forms = await (allForms as Cursor)
    .map((f) => ({ ...f, _id: f._id.toString() }))
    .toArray()

  res.json(forms)
  res.end()
}

export default handler
