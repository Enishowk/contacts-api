const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

module.exports = {
  generateTokenForUser: userData =>
    jwt.sign(
      {
        uuid: userData.uuid,
        username: userData.username,
      },
      config.jwt.secret,
      {
        expiresIn: "2h",
      },
    ),
};
