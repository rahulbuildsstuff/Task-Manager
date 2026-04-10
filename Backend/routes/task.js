const express = require("express");
const router = express.Router();
const { readTasks, writeTasks } = require("../utils/fileHandler");
const { v4: uuidv4 } = require("uuid");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }


});

// POST task
router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const tasks = await readTasks();

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await writeTasks(tasks);
  res.status(201).json(newTask);
});

// PATCH
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const tasks = await readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (title !== undefined) {
    if (!title.trim()) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  await writeTasks(tasks);
  res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  let tasks = await readTasks();
  const filtered = tasks.filter((t) => t.id !== id);

  if (tasks.length === filtered.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  await writeTasks(filtered);
  
  res.json({ message: "Task deleted" });


});


module.exports = router;