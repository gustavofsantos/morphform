import { NextApiHandler } from "next"
import { DraftFormService } from "~/forms/services/draft-form.service"

const handler: NextApiHandler = async (req, res) => {
  const body = req.body

  console.log({ body })
  await DraftFormService.saveDraftState(body.email, body.formState)

  res.status(200)
  res.end()
}

export default handler
