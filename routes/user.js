const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("../utils/jwt");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  db.User.findOne({ where: { username } })
    .then(loginAlreadyTaken => {
      if (!loginAlreadyTaken) {
        bcrypt.hash(password, 10, (err, bcryptedPassword) => {
          db.User.create({
            username,
            password: bcryptedPassword,
          })
            .then(newUser => res.status(201).json({ uuid: newUser.uuid }))
            .catch(() => res.status(500).json({ error: "Cannot add user." }));
        });
      } else {
        return res.status(409).json({ error: "User already exist." });
      }
    })
    .catch(() => res.status(500).json({ error: "Unable to verify user" }));
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  db.User.findOne({
    where: { username },
  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (errBcrypt, resBcrypt) => {
          if (resBcrypt) {
            return res.json({
              uuid: user.uuid,
              token: jwt.generateTokenForUser(user),
            });
          }
          return res.status(403).json({ error: "Invalid password." });
        });
      } else {
        res.status(401).json({ error: "User not exist." });
      }
    })
    .catch(() => res.status(500).json({ error: "Unable to verify user" }));
});

module.exports = router;
