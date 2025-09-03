import React from "react";

export const TaskOutput = ({ tasks, onToggle, onDelete }) => {
  //const API = import.meta.env.VITE_API_BASE_URL;
  console.log("TASKS RECEIVED IN TaskOutput:", tasks);

  // Defensive check
  if (!Array.isArray(tasks)) {
    return <p className="text-red-500">⚠️ Error: Invalid tasks prop.</p>;
  }

  return (
    <div className="mt-3 px-4 py-4 border-2">
      <h2 className="font-bold underline">Your list of tasks to be done!!</h2>
      {tasks.length === 0 ? (
        <p>No tasks added yet </p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center gap-1 py-2"
            >
              <span
                className="flex-1"
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  color: item.completed ? "gray" : "black",
                }}
              >
                {item.text}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-green-200 rounded"
                  type="button"
                  onClick={() => onToggle(item._id)}
                >
                  ✅
                </button>
                <button
                  className="px-2 py-1 bg-red-200 rounded"
                  type="button"
                  onClick={() => onDelete(item._id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskOutput;