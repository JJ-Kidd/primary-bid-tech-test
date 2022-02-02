import express from 'express';
import { Request, Response } from 'express';
import { getUrls } from './repo/url-repo';
import { createShortUrl } from './bl/url-bl';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  console.log(process.env);
  res.send('Hello PrimaryBid');
});

app.get('/urls', async (req: Request, res: Response) => {
  const results = await getUrls();
  res.send(results);
});

app.post('/create-short-link', async (req: Request, res: Response) => {
  console.log(req.body);
  const { url } = req.body || {};
  if(!url) {
    res.status(400).send("Error: Missing `URL` parameter")
  } else{
    const creation = await createShortUrl(url);
    res.send(creation);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);