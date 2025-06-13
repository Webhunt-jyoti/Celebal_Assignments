import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      alert("Please enter a valid task!");
      return;
    }
    addTodo(trimmed);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        className="todo-input"
        placeholder="What’s the task today?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">Add Task</button>
    </form>
  );
};
