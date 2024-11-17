import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getUsername } from "../api/userApi.js";
import { insertObservation } from "../api/inputApi.js";
import { getDebrisList } from "../api/debrisApi.js";

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// User routes
app.get("/api/user/getUsername/:userID", getUsername);

// Observation routes
app.post("/api/observations/insert", insertObservation);

// Debris routes
app.get("/api/debris/list", getDebrisList);

const PORT = process.env.PORT || 5171;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(` - GET  /api/user/getUsername/:userID`);
  console.log(` - POST /api/observations/insert`);
  console.log(` - GET  /api/debris/list`);
});