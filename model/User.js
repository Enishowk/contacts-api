class User {
  constructor(id, login, password) {
    this.id = id;
    this.username = login;
    this.password = password;
  }
}

module.exports = {
  User,
};
