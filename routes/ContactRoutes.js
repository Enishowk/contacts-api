const {
  getContactsAction,
  createContactAction,
} = require("../controller/ContactController");

const ContactRoutes = [
  {
    path: "/contact",
    method: "get",
    action: getContactsAction,
  },
  {
    path: "/create/new",
    method: "post",
    action: createContactAction,
  },
];

module.exports = ContactRoutes;
