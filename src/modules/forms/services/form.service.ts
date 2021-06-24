import { list } from "@chakra-ui/react"
import { ObjectId } from "mongodb"
import { Accounts } from "~/accounts/accounts"
import { Collections } from "~/config/constants"
import { Mongo } from "~/db/clients/mongo-client"

export const FormService = {
  create: async (userEmail: string, form: unknown) => {
    const [coll, err] = await Mongo.getCollection(Collections.forms)
    if (err) return [undefined, err]

    const user = await Accounts.findUserByEmail(userEmail)

    await coll.insertOne({
      ownerId: user._id,
      form
    })
  },

  async registerSubmission(formId: string, submission: any) {
    const [coll, err] = await Mongo.getCollection(Collections.forms)
    if (err) return [undefined, err]

    await coll.findOneAndUpdate(
      { _id: new ObjectId(formId) },
      { $push: { submissions: { _id: new ObjectId(), submission } } },
      {
        upsert: true
      }
    )
  },

  async list(email: string) {
    const [coll, err] = await Mongo.getCollection(Collections.forms)
    if (err) return [undefined, err]

    const user = await Accounts.findUserByEmail(email)

    return coll.find({ ownerId: user._id })
  },

  async findById(id: string) {
    const [coll, err] = await Mongo.getCollection(Collections.forms)
    if (err) return [undefined, err]

    const form = await coll.findOne({ _id: new ObjectId(id) })
    return form
  }
}
