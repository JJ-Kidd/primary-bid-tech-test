import express from 'express';
import { Request, Response } from 'express';
import mongoClient from './mongo';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req: Request, res: Response) => {
  console.log(process.env);
  res.send('Hello PrimaryBid');
});

app.get('/dbconnection', async (req: Request, res: Response) => {
  try{
    const dbConnection = await mongoClient();
    console.log(dbConnection);
  } catch(e) {
    console.log("An error occurred connecting to the DB", e);
  }
  res.send("Connection test, check console");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);