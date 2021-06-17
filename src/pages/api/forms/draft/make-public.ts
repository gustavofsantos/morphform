import { NextApiHandler } from "next"
import { Mongo } from "~/db/clients/mongo-client"

const handle: NextApiHandler = async (req, res) => {
  const { email, formId } = req.body
  console.log({ email, formId })

  const [draftsColl] = await Mongo.getCollection("drafts")
  const draftForm = await draftsColl.findOne({
    email: email,
    "state.id": formId
  })

  const [formsColl] = await Mongo.getCollection("forms")
  await formsColl.insertOne({ ...draftForm, public: true })

  await draftsColl.deleteOne({
    email: email,
    "state.id": formId
  })

  res.status(200)
  res.end()
}

export default handle
