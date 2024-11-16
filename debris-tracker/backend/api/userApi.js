const pool = require("../server/database");

//validate user call

//checkRole

// POST Debris Details

// GET Linked Debris

// GET user

module.exports = {};

// example of validate user

// async function validateUser(req, res) {
//     let data = "";

//     // Collect data from the request body
//     req.on("data", (chunk) => {
//       data += chunk.toString();
//     });

//     // Parse JSON data when request ends
//     req.on("end", () => {
//       const jsonData = JSON.parse(data);
//       const { username, password } = jsonData;

//       const query = `START TRANSACTION;
//               SELECT u.userID, u.role, c.FirstName
//               FROM user_logins as u
//               INNER JOIN customers as c on c.UserID = u.UserID
//               WHERE u.Username = '${username}' AND
//                   u.Pwd = '${password}'

//               UNION

//               SELECT u.userID, u.role, e.FirstName
//               FROM user_logins as u
//               INNER JOIN employees as e on e.UserID = u.UserID
//               WHERE username = '${username}' AND
//                   pwd = '${password}';

//               COMMIT;`;

//       pool.query(query, (error, results, fields) => {
//         if (error) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({ error: "Error retrieving data from database" })
//           );
//         } else {
//           // Send the results back to the client
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(JSON.stringify(results));
//         }
//       });
//     });
//   }
