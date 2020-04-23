module.exports = (knex, Channel) => {
  return () => {
    return knex("channels").then((channels) => {
      return channels.map((element) => {
        return new Channel(element);
      });
    });
  };
};
