const pool = require("../server/database");

// Simple test API endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// Make sure the server is running on a port
app.listen(3000, () => {
  console.log("Backend is running on port 3000");
});
