import { MongoClient as mockMongoClient, Document } from "mongodb";
import { getUrls, getUrlByShort, insertUrl } from '../url-repo';
import mongoClient from '../../mongo';

const { MONGO_URL: mockMongoURL } = process.env;

jest.mock('../../mongo', () => {
  return jest.fn().mockImplementation(async () => {
    const connection = await mockMongoClient.connect(mockMongoURL);
    const db = await connection.db();
    return db;
  })
})


test('getAllUrls', async () => {
  const db = await mongoClient();
  const url = db.collection('url');
  const mockUrls: Array<Document> = [
    { "_id": "61f719755d4e151c3d5d79e6", long_url: 'www.google.com', short_url: '65qz4hva' }, 
    { "_id": "61f719755d4e151c3d5d79e7", long_url: 'www.asos.com', short_url: '65qz4hvb' }, 
    { "_id": "61f719755d4e151c3d5d79e8", long_url: 'www.bbc.co.uk', short_url: '65qz4hvc' }
  ];
  await url.insertMany(mockUrls);

  expect(await getUrls()).toMatchObject(mockUrls);

  await url.drop();
})

test("getUrlByShort that doesn't exist", async () => {
  // DB is empty so this should always return false
  expect(await getUrlByShort("a43fwfq4")).toBe(null);

})

test('getUrlByShort that exists', async () => {
  const db = await mongoClient();
  const url = db.collection('url');
  const mockUrl: Document = { "_id": "61f719755d4e151c3d5d79e6", long_url: 'www.google.com', short_url: '65qz4hva' };
  await url.insertOne(mockUrl);
  // DB is empty so this should always return false
  expect(await getUrlByShort("65qz4hva")).toMatchObject(mockUrl);
  await url.drop();
})

test('insertUrl', async () => {
  const db = await mongoClient();
  const url = db.collection('url');

  const testEntry = {long_url: "https://playerslounge.co", short_url: "a4f82c9g"};
  expect(await insertUrl(testEntry)).toBe(true);

  const dbEntries = await url.find();
  const res: Array<Document> = await dbEntries.toArray();

  expect(res).toMatchObject([testEntry])

  await url.drop();
})
