import { useState } from "react";
import { updateTask, deleteTask } from "../api";

export default function TaskList({ tasks, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found</p>;
  }

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (taskId) => {
    if (!editText.trim()) return;
    await updateTask(taskId, { title: editText.trim() });
    setEditingId(null);
    refresh();
  };

  const handleKeyDown = (e, taskId) => {
    if (e.key === "Enter") saveEdit(taskId);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="border p-2 flex items-center gap-2">

          {editingId === task.id ? (
            /* ── Edit mode ── */
            <>
              <input
                className="border p-1 flex-1 rounded"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, task.id)}
                autoFocus
              />
              <button
                className="bg-green-500 text-white px-2 py-1 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => saveEdit(task.id)}
                disabled={!editText.trim()}
                title="Save (Enter)"
              >
                Save
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300"
                onClick={cancelEdit}
                title="Cancel (Esc)"
              >
                Cancel
              </button>
            </>
          ) : (
            /* ── View mode ── */
            <>
              <span
                className={`flex-1 cursor-pointer select-none ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={async () => {
                  await updateTask(task.id, { completed: !task.completed });
                  refresh();
                }}
                title="Click to toggle complete"
              >
                {task.title}
              </span>

              <button
                className="text-blue-500 hover:text-blue-700 px-2 py-1 rounded text-sm hover:bg-blue-50"
                onClick={() => startEdit(task)}
                title="Edit task"
              >
                Edit
              </button>

              <button
                className="text-red-500 hover:text-red-700 px-2 py-1 rounded text-sm hover:bg-red-50"
                onClick={async () => {
                  await deleteTask(task.id);
                  refresh();
                }}
                title="Delete task"
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}