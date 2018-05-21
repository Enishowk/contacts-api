const express = require("express");
const db = require("../models/index");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("login");
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
            res.json(user);
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
