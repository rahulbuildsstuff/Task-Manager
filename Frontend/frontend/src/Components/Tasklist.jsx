import { toggleTask, deleteTask } from "../api";

export default function TaskList({ tasks, refresh }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center border p-2"
        >
          <span
            className={`cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
            onClick={async () => {
              await toggleTask(task.id);
              refresh();
            }}
          >
            {task.title}
          </span>

          <button
            className="text-red-500"
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