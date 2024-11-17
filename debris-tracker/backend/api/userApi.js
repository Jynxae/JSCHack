import { connectionPool } from "../server/database.js";

export async function getUsername(req, res) {
  try {
    const userID = req.params.userID; // Get userID from URL parameters

    const query = "SELECT Username FROM users WHERE UserID = ?";

    connectionPool.query(query, [userID], (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res
          .status(500)
          .json({ error: "Error finding data in the database" });
      }

      if (!results.length) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
