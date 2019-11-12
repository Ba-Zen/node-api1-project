// implement your API here
const express = require("express");

const server = express();

const users = require("./data/db.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hey Batman");
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ error: "Please enter a name and a bio for the user" });
  } else {
    users
      .insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "There was an error processing your request" });
      });
  }
});

server.listen(8000, () =>
  console.log("Holy Toledo Batman, we're up and running on port 8k")
);
