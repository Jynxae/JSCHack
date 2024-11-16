// server/database.js
const mysql = require("mysql");
require("dotenv").config();

// Validate required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_DATABASE",
];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
}

// Pool configuration
const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // Adjust based on your needs
  connectTimeout: 10000, // 10 seconds
  waitForConnections: true,
  queueLimit: 0,
  // Enable debug when needed
  debug: process.env.NODE_ENV === "development",
};

const pool = mysql.createPool(poolConfig);

// Promisify pool query to use async/await
pool.queryAsync = function (sql, values) {
  return new Promise((resolve, reject) => {
    this.query(sql, values, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Test and monitor database connection
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    console.error("Error connecting to MySQL database:", err.stack);
    return;
  }

  console.log("Connected to MySQL database as id", connection.threadId);
  connection.release();
});

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Handle process termination
process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing MySQL pool:", err);
    }
    console.log("MySQL pool closed");
    process.exit(0);
  });
});

module.exports = pool;
