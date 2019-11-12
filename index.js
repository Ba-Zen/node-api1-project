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

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        err,
        err: "the users information could not be retrieved"
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  users
    .findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, error: "The user information could not be retrieved." });
    });
});

server.listen(8000, () =>
  console.log("Holy Toledo Batman, we're up and running on port 8k")
);
