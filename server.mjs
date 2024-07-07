const { createServer } = require('http')
const next = require('next')

const hostname = 'asmbedcoding.kro.kr';
const port = 443

const app = next({ hostname, port })
const handle = app.getRequestHandler()

// Certificate is saved at: /etc/letsencrypt/live/asmbedcoding.kro.kr/fullchain.pem
// Key is saved at:         /etc/letsencrypt/live/asmbedcoding.kro.kr/privkey.pem

app.prepare().then(() => {
  createServer({
    key: '/etc/letsencrypt/live/asmbedcoding.kro.kr/fullchain.pem',
    cert: '/etc/letsencrypt/live/asmbedcoding.kro.kr/privkey.pem',
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
})