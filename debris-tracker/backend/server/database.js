const express = require("express");
const app = express();

const mysql = require("mysql");

var connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connectionPool.getConnection((err, connection) => {
  if (err)
    return console.error("Error connecting to MySQL database:", err.stack);
  console.log("Connected to MySQL database as id", connection.threadId);
  connection.release();
});

module.exports = connectionPool;
