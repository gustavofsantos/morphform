import { Collections } from "~/config/constants"
import { Mongo } from "~/db/clients/mongo-client"

export const DraftFormService = {
  saveDraftState: async (email: string, formState: any) => {
    const [coll, error] = await Mongo.getCollection(Collections.drafts)
    if (error) return [undefined, error]

    await coll.findOneAndUpdate(
      { email: { $eq: email } },
      { $set: { state: formState } },
      {
        upsert: true
      }
    )
  }
}
