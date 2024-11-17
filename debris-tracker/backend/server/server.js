import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getUsername } from "../api/userApi.js";
import { insertObservation } from "../api/inputApi.js";

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Changed to GET and updated the path to include the userID as a parameter
app.get("/api/user/getUsername/:userID", getUsername);
app.post("/api/observations/insert", insertObservation);


const PORT = process.env.PORT || 5171;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
