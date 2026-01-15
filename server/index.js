import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  const r = await pool.query("SELECT 1 as ok");
  res.json(r.rows[0]);
});
// Liste des pays
app.get("/api/countries", async (req, res) => {
  const r = await pool.query(
    "SELECT country FROM country_sport_podium_pred ORDER BY country ASC"
  );
  res.json(r.rows.map((x) => x.country));
});

// Détails d’un pays
app.get("/api/countries/:country", async (req, res) => {
  const country = req.params.country;

  const r = await pool.query(
    `SELECT country, sport_1, points_1, sport_2, points_2, sport_3, points_3
     FROM country_sport_podium_pred
     WHERE country = $1`,
    [country]
  );

  res.json(r.rows[0] ?? null);
});
app.get("/api/top-countries", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 10), 50);

    const q = `
      SELECT
        country,
        (points_1 + points_2 + points_3)::float8 AS total_points
      FROM country_sport_podium_pred
      ORDER BY total_points DESC
      LIMIT $1
    `;
    const { rows } = await pool.query(q, [limit]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("API running");
});
