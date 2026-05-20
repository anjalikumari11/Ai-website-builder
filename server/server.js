import dotenv from "dotenv";
await dotenv.config();
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/AiRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});