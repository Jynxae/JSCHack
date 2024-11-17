import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "node:fs";
import mysql2 from "mysql2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../../../.env` });

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);


const connectionPool = mysql2.createPool({
  host: "space-guard.mysql.database.azure.com",
  port: process.env.DB_PORT,
  user: "ykhan5",
  password: process.env.DB_PASSWORD,
  database: "satellitetracking",
});

connectionPool.getConnection((err, connection) => {
  if (err)
    return console.error("Error connecting to MySQL database:", err.stack);
  console.log("Connected to MySQL database as id", connection.threadId);
  connection.release();
});

export { connectionPool };
