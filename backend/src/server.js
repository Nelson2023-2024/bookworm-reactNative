import express from "express";
import { configDotenv } from "dotenv";
import { authRoutes } from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import { bookRoutes } from "./routes/book.routes.js";
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB()
});
