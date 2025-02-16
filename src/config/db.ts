import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Ensure port is a number
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB SSL
  },
});

// Test database connection
pool
  .connect()
  .then((client: PoolClient) => {
    console.log("✅ Database connected successfully!");
    client.release(); // Release the client after checking
  })
  .catch((err: Error) => console.error("❌ Database connection error:", err));

export default pool;
