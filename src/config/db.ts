import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?sslmode=require`,
  ssl: { rejectUnauthorized: false }, // Required for NeonDB
});

pool.connect()
  .then(() => console.log("✅ Connected to NeonDB successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default pool;
