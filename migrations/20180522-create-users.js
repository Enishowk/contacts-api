module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Users", {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable("Users"),
};
