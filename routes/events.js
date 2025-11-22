const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all events
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM events ORDER BY id DESC");
  res.json(result.rows);
});

// CREATE event
router.post("/", async (req, res) => {
  const { title, description, date, time, location } = req.body;
  const result = await pool.query(
    "INSERT INTO events (title, description, date, time, location) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, description, date, time, location]
  );
  res.json(result.rows[0]);
});

// UPDATE event
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time, location } = req.body;

  const result = await pool.query(
    "UPDATE events SET title=$1, description=$2, date=$3, time=$4, location=$5 WHERE id=$6 RETURNING *",
    [title, description, date, time, location, id]
  );
  res.json(result.rows[0]);
});

// DELETE event
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM events WHERE id=$1", [id]);
  res.json({ message: "Event deleted" });
});

// RSVP to event (increase attendees)
router.post("/:id/rsvp", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE events SET attendees = attendees + 1 WHERE id=$1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
});

module.exports = router;
