import { useState } from "react";
import { updateTask, deleteTask } from "../api";

export default function TaskList({ tasks, refresh }) {
  if (tasks.length === 0) {
  return <p className="text-gray-500">No tasks found</p>;
}
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="border p-2 flex items-center">
          
          {editingId === task.id ? (
            <input
              className="border p-1 flex-1 mr-2"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={async () => {
                await updateTask(task.id, { title: editText });
                setEditingId(null);
                refresh();
              }}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={async () => {
                await updateTask(task.id, {
                  completed: !task.completed,
                });
                refresh();
              }}
              onDoubleClick={() => {
                setEditingId(task.id);
                setEditText(task.title);
              }}
            >
              {task.title}
            </span>
          )}

          <button
            className="text-red-500 ml-2"
            onClick={async () => {
              await deleteTask(task.id);
              refresh();
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}