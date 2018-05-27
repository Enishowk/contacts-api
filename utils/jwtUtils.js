const jwt = require("jsonwebtoken");
const config = require("../ormconfig.json");

const generateTokenForUser = userData =>
  jwt.sign(
    {
      uuid: userData.uuid,
      username: userData.username,
    },
    config.jwt.secret,
    {
      expiresIn: "2h",
    },
  );

const parseToken = jwtToken => {
  return jwtToken ? jwtToken.replace("Bearer ", "") : null;
};

const getUserId = jwtToken => {
  let userId = null;
  const token = parseToken(jwtToken);

  if (token) {
    try {
      const isValidToken = jwt.verify(token, "config.jwt.secret");
      if (isValidToken) {
        userId = isValidToken.uuid;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return userId;
};

module.exports = {
  generateTokenForUser,
  getUserId,
};
