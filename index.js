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
  const { id } = req.params;
  users
    .findById(id)
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

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  users
    .remove(id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({
          message: "The user was deleted"
        });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error, error: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;
  const { id } = req.params;

  if (!name || !bio) {
    res.status(400).json({ error: "please provide name and bio for the user" });
  } else {
    users
      .update(id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(req.body);
        } else {
          res.status(404).json({
            message: "the user with the specified ID does not exist"
          });
        }
      })
      .catch(error => {
        res.status(500).json({ error, error: "The user could not be updated" });
      });
  }
});

server.listen(8000, () =>
  console.log("Holy Toledo Batman, we're up and running on port 8k")
);
