const http = require('http');
const { parse } = require('url');
const next = require('next');
const { createServer } = require("https");
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const PORT = 3000;
const app = next({ dev, hostname, PORT });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./example.com+4-key.pem'),
  cert: fs.readFileSync('./example.com+4.pem'),
};

// app.prepare().then(() => {
//   http
//     .createServer((req, res) => {
//       const parsedUrl = parse(req.url, true);
//       handle(req, res, parsedUrl);
//     })
//     .listen(PORT, (err) => {
//       if (err) throw err;
//       console.log(`> Ready on http://localhost:${PORT}`);
//     });

//   // https 서버 추가
//   // https
//   //   .createServer(httpsOptions, (req, res) => {
//   //     const parsedUrl = parse(req.url, true);
//   //     handle(req, res, parsedUrl);
//   //   })
//   //   .listen(PORT, (err) => {
//   //     if (err) throw err;
//   //     console.log(`> HTTPS: Ready on https://localhost:${PORT}`);
//   //   });
// });

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (error) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${PORT}`);
  });
});