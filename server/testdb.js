const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const res = await client.query("SELECT NOW()");
    console.log(res.rows);
    client.release();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();
