import express from 'express';
import { Request, Response } from 'express';
import mongoClient from './mongo';
import { getUrls } from './repo/url';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req: Request, res: Response) => {
  console.log(process.env);
  res.send('Hello PrimaryBid');
});

app.get('/urls', async (req: Request, res: Response) => {
  const results = await getUrls();
  res.send(results);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);