const validateChannelName = (uName) =>
  typeof uName === "string" && uName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    // console.log("WGAFTA", params);
    const name = params.name;

    if (!validateChannelName(name)) {
      return Promise.reject(
        new Error("Channel name must be provided, and at least four characters")
      );
    }

    return (
      knex("channels")
        .insert({ name: name.toLowerCase() })
        .then(() => {
          return knex("channels")
            .where({ name: name.toLowerCase() })
            .select();
        })
        .then((channels) => new Channel(channels.pop()))
        //idk why i need pop()
        .catch((err) => {
          // sanitize known errors
          if (
            err.message.match("duplicate key value") ||
            err.message.match("UNIQUE constraint failed")
          )
            return Promise.reject(new Error("That channel already exists"));

          // throw unknown errors
          return Promise.reject(err);
        })
    );
  };
};

// this.id = dbChannel.id;
// this.name = dbChannel.name;
