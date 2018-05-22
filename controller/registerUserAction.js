const { getManager } = require("typeorm");
const UserSchema = require("../entity/UserSchema");
const bcrypt = require("bcrypt");
/**
 * Loads all posts from the database.
 */
const registerUserAction = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const userRepository = getManager().getRepository(UserSchema);
  const userAlreadyTaken = await userRepository.findOne({ username });

  if (!userAlreadyTaken) {
    bcrypt.hash(password, 10, async (err, bcryptedPassword) => {
      const user = {
        username,
        password: bcryptedPassword,
      };

      await userRepository
        .save(user)
        .then(newUser => res.status(201).json({ newUser: newUser.id }))
        .catch(() => res.status(500).json({ error: "Cannot add user." }));
    });
  } else {
    return res.status(409).json({ error: "User already exist." });
  }

  // return res.status(500).json({ error: "Unable to verify user" });
};

module.exports = registerUserAction;
