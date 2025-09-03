const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());
app.use(express.json());

const taskSchema = mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("A Simple Task Manager");
});

app.post("/submit", async (req, res) => {
  const { text, completed = false } = req.body;
  try {
    const newTask = new Task({ text, completed });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error saving task:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // gets all tasks
    console.log(tasks);
    res.json(tasks); // ✅ returns array, even if empty
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Unable to toggle task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unable to delete task" });
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log("server open port 5000");
});