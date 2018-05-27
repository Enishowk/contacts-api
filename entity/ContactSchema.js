const { EntitySchema } = require("typeorm");
const { Contact } = require("../model/Contact");

module.exports = new EntitySchema({
  name: "Contact",
  target: Contact,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
    },
    lastname: {
      type: "varchar",
    },
    mail: {
      type: "varchar",
    },
    phone: {
      type: "varchar",
    },
  },
  relations: {
    users: {
      target: "User",
      type: "many-to-one",
    },
  },
});
