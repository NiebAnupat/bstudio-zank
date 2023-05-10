import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mysql from "mysql2";
import dayjs from "dayjs";
import moment from "moment-timezone";

dotenv.config();
const port = process.env.PORT;
const db = mysql.createConnection(process.env.DATABASE_URL);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db
      .promise()
      .query(`SELECT * FROM users WHERE username = ?`, [username]);
    if (user.length === 0)
      return res.status(404).json({ message: "User not found" });
    if (user[0][0].password !== password)
      return res.status(401).json({ message: "Password incorrect" });
    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/booking", async (req, res) => {
  const { r_id, date, time_in, time_out } = req.body;
  const defaultDate = "1970-01-01";
  try {
    const newTimeIn = dayjs(`${defaultDate} ${time_in}:00`).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const newTimeOut = dayjs(`${defaultDate} ${time_out}:00`).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const newDate = dayjs(date).format("YYYY-MM-DD");
    const result = await db
      .promise()
      .query(
        `SELECT * FROM history WHERE r_id = ? AND date = ? AND (time_in BETWEEN ? AND ? OR time_out BETWEEN ? AND ?)`,
        [r_id, newDate, newTimeIn, newTimeOut, newTimeIn, newTimeOut]
      );
    if (result[0].length > 0) {
      return res.status(409).json({ message: "Room is not available" });
    }
    const newBooking = await db
      .promise()
      .query(
        `INSERT INTO history (r_id, date, time_in, time_out) VALUES (?, ?, ?, ?)`,
        [r_id, newDate, newTimeIn, newTimeOut]
      );
    return res
      .status(200)
      .json({ message: "Booking success", data: newBooking[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/rooms/available", async (req, res) => {
  const { date, time_in, time_out } = req.query;
  const defaultDate = "1970-01-01";
  try {
    const newTimeIn = dayjs(`${defaultDate} ${time_in}:00`).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const newTimeOut = dayjs(`${defaultDate} ${time_out}:00`).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const query = `SELECT * FROM room WHERE id NOT IN (SELECT r_id FROM history WHERE date = ? AND (time_in BETWEEN ? AND ? OR time_out BETWEEN ? AND ?))`;
    const result = await db
      .promise()
      .query(query, [date, newTimeIn, newTimeOut, newTimeIn, newTimeOut]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/rooms/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db
      .promise()
      .query(`SELECT * FROM room WHERE id = ?`, [id]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/history", async (req, res) => {
  try {
    const result = await db.promise().query(`SELECT * FROM history`);
    const data = result[0].map((item) => {
      return {
        ...item,
        date: moment(item.date).tz("Asia/Bangkok").format("YYYY-MM-DD"),
      };
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/history/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query(`DELETE FROM history WHERE id = ?`, [id]);
    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
