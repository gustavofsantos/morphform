import { NextApiHandler } from "next"
import { Mongo } from "~/db/clients/mongo-client"

const handler: NextApiHandler = async (req, res) => {
  const [coll] = await Mongo.getCollection("forms")
  const forms = await coll
    .find({ email: req.query.email })
    .map((f) => ({ ...f, _id: f._id.toString() }))
    .toArray()

  res.json(forms)
  res.end()
}

export default handler
