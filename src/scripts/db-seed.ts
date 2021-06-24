import { Db } from "mongodb"
import { Collections } from "~/config/constants"
import { Mongo } from "~/db/clients/mongo-client"

async function run() {
  const [db, err] = await Mongo.getDb()
  if (err) throw err

  // drop all collections
  await dropFormsCollection(db)

  // insert values
  await seedFormsCollection(db)
}

async function dropFormsCollection(db: Db) {
  await db.collection(Collections.forms).drop()
}

async function seedFormsCollection(db: Db) {
  db.collection(Collections.forms).insertMany([])
}

run()
  .then(() => console.log("Success"))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
