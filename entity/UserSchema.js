const { EntitySchema } = require("typeorm");
const { User } = require("../model/User");

module.exports = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    uuid: {
      primary: true,
      generated: "uuid",
      type: "varchar",
    },
    username: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {},
});
