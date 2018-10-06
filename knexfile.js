module.exports = {
  development: {
    client: "sqlite",
    useNullAsDefault: true,
    connection: {
      filename: "./database/dev.sqlite"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
