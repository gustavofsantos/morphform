import { Cursor } from "mongodb"
import { NextApiHandler } from "next"
import { Mongo } from "~/db/clients/mongo-client"
import { FormService } from "~/forms/services/form.service"

const handler: NextApiHandler = async (req, res) => {
  const allForms = await FormService.list(req.query.email as string)
  const forms = await (allForms as Cursor)
    .map((f) => ({ ...f, _id: f._id.toString() }))
    .toArray()

  console.log({ forms })

  res.json(forms)
  res.end()
}

export default handler
