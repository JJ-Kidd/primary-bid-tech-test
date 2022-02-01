import { ObjectId } from 'mongodb';
import mongoClient from '../mongo';

const collection = 'url'

type urlType = {
  _id?: ObjectId,
  long_url: string,
  short_url: string
}

export const getUrls = async () => {
  const dbConnection = await mongoClient();
  const coll = dbConnection.collection(collection)

  const query = await coll.find();
  return await query.toArray();
}

export const getUrlByShort = async (short_url: string) => {
  const dbConnection = await mongoClient();
  const coll = dbConnection.collection(collection)

  const query = await coll.findOne({short_url});
  return query;
}

export const insertUrl = async (url: urlType) => {
  const dbConnection = await mongoClient();
  const coll = dbConnection.collection(collection)

  const query = await coll.insertOne(url);
  return query.acknowledged;
}