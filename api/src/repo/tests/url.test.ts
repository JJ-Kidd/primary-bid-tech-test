import { MongoClient as mockMongoClient, Document } from "mongodb";
import { getUrls } from '../url';
import mongoClient from '../../mongo';

const { MONGO_URL: mockMongoURL } = process.env;

jest.mock('../../mongo', () => {
  return jest.fn().mockImplementation(async () => {
    const connection = await mockMongoClient.connect(mockMongoURL);
    const db = await connection.db();
    return db;
  })
})

describe('getAllUrls', () => {

  afterEach(() => close())

  test('get all urls', async () => {
    const db = await mongoClient();
    const url = db.collection('url');
    const mockUrls: Array<Document> = [
      { "_id": "61f719755d4e151c3d5d79e6", long_url: 'www.google.com', short_url: '65qz4hva' }, 
      { "_id": "61f719755d4e151c3d5d79e7", long_url: 'www.asos.com', short_url: '65qz4hvb' }, 
      { "_id": "61f719755d4e151c3d5d79e8", long_url: 'www.bbc.co.uk', short_url: '65qz4hvc' }
    ];
    await url.insertMany(mockUrls);

    expect(await getUrls()).toMatchObject(mockUrls);

    (await mockMongoClient.connect(mockMongoURL)).close();
  })

});