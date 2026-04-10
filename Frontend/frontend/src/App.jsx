import { useEffect, useState } from "react";
import { fetchTasks } from "./api";
import TaskForm from "./Components/Taskform";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <TaskForm onTaskAdded={loadTasks} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <TaskList tasks={tasks} refresh={loadTasks} />
    </div>
  );
}