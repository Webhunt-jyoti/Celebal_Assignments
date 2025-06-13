import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import "./Todo.css";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState(() => {
    // 🛠️ Fix: use lazy initializer to load from localStorage once
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("default");

  // ✅ Always save to localStorage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) =>
    setTodos([...todos, { id: uuidv4(), task, completed: false, isEditing: false }]);

  const toggleComplete = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const editTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t)));

  const editTask = (task, id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, task, isEditing: false } : t)));

  const filtered = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "alpha") return a.task.localeCompare(b.task);
    if (sortType === "status") return a.completed - b.completed;
    return 0;
  });

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="todo-input"
          style={{ width: "auto", marginRight: "0.5rem" }}
        >
          <option value="default">Sort: Default</option>
          <option value="alpha">A → Z</option>
          <option value="status">Status</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="todo-input"
          style={{ width: "auto" }}
        >
          <option value="all">Filter: All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {sorted.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
