const express = require("express");
// const mysql = require("mysql");
// const config = require("../config/env");

// const connection = mysql.createConnection({
//   host: config.DB_HOST,
//   user: config.DB_USER,
//   password: config.DB_PASSWORD,
//   database: config.DB_NAME,
// });

const router = express.Router();

/* GET home page. */

router.get("/", (req, res) => {
  // connection.query("SELECT * FROM `users`", (error, results, fields) => {
  //   console.log("index", "17", results[0]);
  //   // error will be an Error if one occurred during the query
  //   // results will contain the results of the query
  //   // fields will contain information about the returned results fields (if any)
  // });
  res.render("index", { title: "Express test" });
});

module.exports = router;
