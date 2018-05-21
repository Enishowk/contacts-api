const express = require("express");

const router = express.Router();

/* GET users listing. */
router.get("/login", (req, res) => {
  res.send("login");
});

module.exports = router;
