const express = require("express");
const router = express.Router();
const pool = require("../server/database");

// Simple test endpoint that also checks database connection
router.get("/test", async (req, res) => {
  console.log("here");

  //   try {
  //     // Test database connection
  //     await pool.query("SELECT 1"); // Simple query to test connection
  //     res.json({
  //       message: "Backend and database connection successful!",
  //       database: "Connected",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Backend connected, but database error",
  //       database: "Error: " + error.message,
  //     });
  //   }
});

module.exports = router;
