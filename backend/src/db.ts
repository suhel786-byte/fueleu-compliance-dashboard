import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fueleu_dashboard",
  password: "Suhel123#",
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });