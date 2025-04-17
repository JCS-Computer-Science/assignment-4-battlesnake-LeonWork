import express from "express";
import { move } from "./moveLogic.js";

const app = express();
app.use(express.json());

const config = {
  apiversion: "1",
  author: "leonberger",
  color: "#cb82ff",
  head: "trans-rights-scarf",
  tail: "default"
};

app.get("/", (req, res) => res.status(200).json(config));

app.post("/start", (req, res) => {
  console.log(`🟢 Game ${req.body.game.id} started`);
  res.sendStatus(200);
});

app.post("/move", (req, res) => {
  const result = move(req.body);
  res.status(200).json(result);
});

app.post("/end", (req, res) => {
  console.log(`🔴 Game ${req.body.game.id} ended`);
  res.sendStatus(200);
});

const port = process.env.PORT || 8000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log(`🚀 Running Battlesnake at http://${host}:${port}`);
});
