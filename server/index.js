const express = require("express");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });

const handle = app.getRequestHandler();

global.app = app;

function main() {
  const server = express();

  server.use(express.static(__dirname + "/static"));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.use((err, req, res) => {
    if (err) {
      res.json({ err });
    }
  });

  server.listen(3000, () => {
    console.log(`Server ready at http://localhost:${3000}`);
  });
}

app.prepare().then(main);
