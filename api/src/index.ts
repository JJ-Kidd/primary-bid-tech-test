import express from 'express';
import { Request, Response } from 'express';
import { getUrls } from './repo/url-repo';
import { createShortUrl } from './bl/url-bl';

const { BASE_URL } = process.env

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
  res.send('Hello PrimaryBid');
});

app.get('/urls', async (req: Request, res: Response) => {
  const results = await getUrls();
  const urls = results.map(({short_url, long_url}) => {
    return {
      short_url: `${BASE_URL}${short_url}`,
      long_url
    }
  })
  res.send(urls);
});

app.post('/create-short-link', async (req: Request, res: Response) => {
  const { url } = req.body || {};
  if(!url) {
    res.status(400).send("Error: Missing `URL` parameter")
  } else{
    const createRes = await createShortUrl(url);
    const short = createRes.short_url ? `${BASE_URL}${createRes.short_url}` : null
    res.send({ ...createRes, short_url: short });
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);