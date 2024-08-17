const { Pool } = require("pg");
require('dotenv').config()


module.exports = new Pool({
  host: "localhost", 
  user: process.env.USER,
  database: "minimb",
  password: process.env.PW,
  port: 5432 
});