import createServer from 'http';
import next from 'next';
import fs from 'fs';

const hostname = 'asmbedcoding.kro.kr';
const port = 443

const app = next({ hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  try {
    createServer({
      key: fs.readFileSync('/etc/letsencrypt/live/asmbedcoding.kro.kr/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/asmbedcoding.kro.kr/cert.pem'),
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