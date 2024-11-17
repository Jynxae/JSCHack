import express from "express";

const app = express();

import { getUsername } from "./database.js";

app.get("/username", async (req, res) => {
  const name = await getUsername(2);
  res.send(name);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("server is running on azure");
});
