module.exports = (queryInterface, Sequelize) => {
  const User = queryInterface.define(
    "User",
    {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
    },
    {},
  );
  return User;
};
