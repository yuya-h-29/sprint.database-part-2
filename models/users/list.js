module.exports = (knex, User) => {
  return () => {
    return knex("users").then((users) => {
      return users.map((element) => new User(element));
    });
  };
};
