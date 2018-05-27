const { EntitySchema } = require("typeorm");
const { User } = require("../model/User");
// const { Contact } = require("../model/Contact");

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
  relations: {
    contacts: {
      target: "Contact",
      type: "one-to-many",
    },
  },
});
