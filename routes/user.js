const express = require("express");
const db = require("../models/index");

const router = express.Router();

router.post("/login", (req, res) => {
  db.User.findOne({
    where: { username: req.body.username, password: req.body.password },
    attributes: ["username"],
  }).then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Login ou Password incorrect." });
    }
  });
});

router.post("/register", (req, res) => {
  db.User.findOne({ where: { username: req.body.username } })
    .then(loginAlreadyTaken => {
      if (loginAlreadyTaken) {
        res.status(409).json({ error: "Username déjà utilisé." });
      } else {
        db.User.create({
          username: req.body.username,
          password: req.body.password,
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(err => {
            res.status(500).json({ error: err.parent.sqlMessage });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.parent.sqlMessage });
    });
});

module.exports = router;
