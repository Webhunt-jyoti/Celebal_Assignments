import React from "react";

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className={`todo ${task.completed ? "completed" : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          style={{ marginRight: "10px", transform: "scale(1.2)" }}
        />
        <p className="task-text">{task.task}</p>
      </div>
      <div>
        <button className="todo-btn" onClick={() => editTodo(task.id)}>Edit</button>
        <button className="todo-btn" onClick={() => deleteTodo(task.id)}>Delete</button>
      </div>
    </div>
  );
};
