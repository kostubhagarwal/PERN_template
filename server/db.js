const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "kos87k748",
  host: "localhost",
  port: 5432,
  database: "[name of database]",
});

module.exports = pool;
