export const getMongoUri = () => process.env.MONGODB_URI

export const GithubConfig = {
  id: () => process.env.GITHUB_ID,
  secret: () => process.env.GITHUB_SECRET
}
