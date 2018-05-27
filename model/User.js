class User {
  constructor(uuid, login, password, contacts) {
    this.uuid = uuid;
    this.username = login;
    this.password = password;
    this.contacts = contacts;
  }
}

module.exports = {
  User,
};
