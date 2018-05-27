const { getManager } = require("typeorm");
const ContactSchema = require("../entity/ContactSchema");
const jwtUtils = require("../utils/jwtUtils");

const getContactsAction = async (req, res) => {
  const userToken = req.headers.authorization;
  const userId = jwtUtils.getUserId(userToken);

  if (userId) {
    const contactRepository = getManager().getRepository(ContactSchema);

    await contactRepository
      .find({ where: { users: userId } })
      .then(contacts => res.json(contacts))
      .catch(error => res.status(500).json({ error }));
  } else {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

const createContactAction = async (req, res) => {};

module.exports = {
  getContactsAction,
  createContactAction,
};
