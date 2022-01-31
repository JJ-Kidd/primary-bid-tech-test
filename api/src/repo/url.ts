import mongoClient from '../mongo';

const collection = 'url'

export const getUrls = async () => {
  const dbConnection = await mongoClient();
  const coll = dbConnection.collection(collection)

  const query = await coll.find();
  return await query.toArray();
}