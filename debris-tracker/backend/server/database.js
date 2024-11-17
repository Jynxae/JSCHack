import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connectionPool = mysql
  .createPool({
    host: "space-guard.mysql.database.azure.com",
    port: process.env.DB_PORT,
    user: "ykhan5",
    password: process.env.DB_PASSWORD,
    database: "satellitetracking",
  })
  .promise();

async function getUsername(id) {
  const [rows] = await connectionPool.query(
    `
    SELECT Username 
    FROM users 
    WHERE UserID = ?;
    `,
    [id]
  );
  return rows;
}

// Export the getUsername function
export { getUsername };

(async () => {
  try {
    const res = await getUsername(3); // Await the result
    console.log(res);
  } catch (error) {
    console.error("Error fetching username:", error);
  }
})();
