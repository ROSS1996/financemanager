import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const db = {
  query: (text: string, params?: any[]): Promise<QueryResult> =>
    pool.query(text, params),
  testConnection: async (): Promise<void> => {
    const res = await db.query("SELECT NOW()");
    console.log("Connected to database:", res.rows[0].now);
  },
};

export default db;
