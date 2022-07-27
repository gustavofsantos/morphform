import { Collection, Db, MongoClient } from "mongodb"
import { getMongoUri } from "~/config/env"
import { MongoConnectionError } from "../errors/mongo-connection.error"

const client = new MongoClient(getMongoUri(), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const Mongo = {
  getDb: async (): Promise<[Db, Error]> => {
    try {
      if (!client.isConnected()) {
        await client.connect()
      }

      return [client.db(), undefined]
    } catch (err) {
      return [undefined, new MongoConnectionError(err.message)]
    }
  },

  getCollection: async (collection: string): Promise<[Collection, Error]> => {
    try {
      const [db, err] = await Mongo.getDb()
      if (err) return [undefined, err]
      return [db.collection(collection), undefined]
    } catch (err) {
      return [undefined, err]
    }
  }
}
