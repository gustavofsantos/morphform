import { NextApiHandler } from "next"
import { FormService } from "~/forms/services/form.service"

const handleSubmit: NextApiHandler = async (req, res) => {
  const formId = req.query.formId
  const submission = req.body
  await FormService.registerSubmission(formId as string, submission)

  res.writeHead(307, "Success!", {
    Location: `/form/${formId}/success`
  })
  res.end()
}

export default handleSubmit
