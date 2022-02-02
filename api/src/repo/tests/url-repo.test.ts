import { MongoClient as mockMongoClient, Document, Db, MongoClient } from "mongodb";
import { getUrls, getUrlByShort, insertUrl } from '../url-repo';
import { mongoClient } from '../../mongo';
const mongoClientAbstraction = mongoClient as jest.MockedFunction<typeof mongoClient>;
const { MONGO_URL: mockMongoURL } = process.env;

jest.mock('../../mongo');

describe("URL-Repo", () => {

  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await mockMongoClient.connect(mockMongoURL);
    db = await connection.db();
    mongoClientAbstraction.mockImplementation(() => Promise.resolve(db));
  });

  afterAll(async () => {
    await connection.close()
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

})