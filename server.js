import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
import ipoRoutes from "./routes/ipoRoutes.js";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL Connection with SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test DB connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch(err => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.send("IPO API is running...");
});

app.use("/api/ipos", ipoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Export pool
export default pool;
