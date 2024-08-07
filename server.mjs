import { createServer } from 'https';
import next from 'next';
import fs from 'fs';

const hostname = 'asmbedcoding.kro.kr';
const port = 3000

const app = next({ hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  try {
    createServer({
      key: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/privkey.pem`, { encoding: "utf-8" }),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/cert.pem`, { encoding: "utf-8" }),
    }, async (req, res) => {
      try {
          await handle(req, res);
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    })
      .listen(port, () => {
        console.log(`> Ready on https://${hostname}:${port}`)
      })
  } catch (error) {
    console.log(error);
  }
})