// implement your API here
const express = require("express");

const server = express();

const users = require("./data/db.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hey Batman");
});

server.listen(8000, () =>
  console.log("Holy Toledo Batman, we're up and running on port 8k")
);
