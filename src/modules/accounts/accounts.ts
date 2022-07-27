import * as bcrypt from "bcrypt"

import { Collections } from "~/config/constants"
import { Mongo } from "~/db/clients/mongo-client"

type CreateUserT = {
  name: string
  email: string
  password: string
}

export const Accounts = {
  saltRounds: 10,

  async createUser(props: CreateUserT) {
    const [coll, err] = await Mongo.getCollection(Collections.users)
    if (err) throw err

    const hashedPassword = await bcrypt.hash(props.password, Accounts.saltRounds)

    await coll.insertOne({
      name: props.name,
      email: props.email,
      password: hashedPassword
    })
  },

  async findUserByEmail(email: string) {
    const [coll, err] = await Mongo.getCollection(Collections.users)
    if (err) throw err

    return coll.findOne({ email })
  },

  async findUserByEmailAndPassword(email: string, password: string) {
    const [coll, err] = await Mongo.getCollection(Collections.users)
    if (err) throw err

    const user = await coll.findOne({ email })
    const match = await bcrypt.compare(password, user.password)

    if (match) return user
    return null
  }
}
