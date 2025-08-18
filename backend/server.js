import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

// Get all todos
app.get("/test", async (req, res) => {
  const { data, error } = await supabase.from("test").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Insert new todo
app.post("/test", async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from("test").insert([{ title }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));