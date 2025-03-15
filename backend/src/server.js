import express from "express";
import { configDotenv } from "dotenv";
import { authRoutes } from "./routes/auth.routes.js";
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
