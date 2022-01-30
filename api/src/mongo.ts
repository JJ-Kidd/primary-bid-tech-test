import { MongoClient, Db } from "mongodb";

const { MONGO_USER, MONGO_PASSWORD, MONGO_URL, MONGO_DB, USE_LOCAL_DB } = process.env

const uri = USE_LOCAL_DB ? 
  `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?authSource=admin&retryWrites=true&writeConcern=majority` :
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&writeConcern=majority`;

let client: MongoClient;
let cachedDb: Db;

const mongoClient = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    client = await MongoClient.connect(uri);
    const db = await client.db(MONGO_DB);
    cachedDb = db;
    return db;

  } catch(e){
    console.error(e);    
  }
}

export default mongoClient;

