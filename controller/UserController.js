const { getManager } = require("typeorm");
const UserSchema = require("../entity/UserSchema");
const bcrypt = require("bcrypt");
const { generateTokenForUser } = require("../utils/jwtUtils");

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
        .then(newUser => res.status(201).json({ newUser: newUser.uuid }))
        .catch(() => res.status(500).json({ error: "Cannot add user." }));
    });
  } else {
    return res.status(409).json({ error: "User already exist." });
  }
};

const loginUserAction = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing parameters." });
  }

  const userRepository = getManager().getRepository(UserSchema);
  const userExist = await userRepository.findOne({ username });

  if (userExist) {
    bcrypt.compare(
      password,
      userExist.password,
      async (errBcrypt, resBcrypt) => {
        if (resBcrypt) {
          return res.json({
            uuid: userExist.uuid,
            token: generateTokenForUser(userExist),
          });
        }
        return res.status(403).json({ error: "Invalid password." });
      },
    );
  } else {
    return res.status(409).json({ error: "User not exist." });
  }
};

module.exports = {
  registerUserAction,
  loginUserAction,
};
