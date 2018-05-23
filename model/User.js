class User {
  constructor(uuid, login, password) {
    this.uuid = uuid;
    this.username = login;
    this.password = password;
  }
}

module.exports = {
  User,
};
