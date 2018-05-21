const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          uuid: uuidv4(),
          username: "user1",
          password: bcrypt.hashSync("pass", 10),
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete("Users", null, {}),
};
