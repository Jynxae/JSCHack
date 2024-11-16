// api/userApi.js
const express = require("express");
const router = express.Router();
const pool = require("../server/database");

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// Example database query endpoint
router.get("/users", async (req, res) => {
  try {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
