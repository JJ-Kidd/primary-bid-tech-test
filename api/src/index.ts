import express from 'express';
import { Request, Response } from 'express';

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello PrimaryBid');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);