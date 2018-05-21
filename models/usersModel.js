module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Users;
};
