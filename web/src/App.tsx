import { useEffect, useState, type ChangeEvent } from "react";
import type { Task } from "./types/task.type";
import TaskItem from "./components/Task/TaskItem";
import styles from "./App.module.scss";

// const dummyTodos: Task[] = [
//   { id: 1, text: "Изучить Express", completed: false },
//   { id: 2, text: "Подключить React frontend", completed: true },
//   { id: 3, text: "Сделать CRUD для todo", completed: false },
// ];

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch("http://localhost:5000/api/todos");
      const data = await res.json();

      setTodos(data);
    };

    fetchTodo();
  }, []);

  async function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) return;

    if (editingTodoId !== null) {
      handleUpdateTodo(editingTodoId, text.trim());
      setText("");
      setEditingTodoId(null);
      return;
    }

    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text.trim() }),
    });

    if (!res.ok) {
      console.error("Failed to create todo");
      return;
    }

    const newTodo = await res.json();

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  async function handleDeleteTodo(id: number) {
    if (editingTodoId === id) {
      setEditingTodoId(null);
      setText("");
    }

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete todo");
    }

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  async function handleUpdateTodo(id: number, newText: string) {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: trimmedText }),
    });

    if (!res.ok) {
      console.error("Failed to update todo");
      return;
    }

    const updatedTodo = await res.json();

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );
  }

  function handleStartEditTodo(todo: Task) {
    setText(todo.text);
    setEditingTodoId(todo.id);
  }

  function handleChangeTextTodo(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  async function handleToggleTodo(id: number) {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (!currentTodo) return;

    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !currentTodo.completed }),
    });

    if (!res.ok) {
      console.error("Failed to toggle todo");
      return;
    }

    const updatedTodo = await res.json();

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );
  }

  return (
    <main className={styles.todo}>
      <div className={styles.todo__bg}></div>

      <section className={styles.todo__card}>
        <div className={styles.todo__header}>
          <p className={styles.todo__subtitle}>My tasks</p>
          <h1 className={styles.todo__title}>Todo List</h1>
          <p className={styles.todo__description}>
            Add, edit and manage your tasks in one clean place.
          </p>
        </div>

        <form className={styles.todo__form} onSubmit={handleAddTodo}>
          <input
            className={styles.todo__input}
            type="text"
            value={text}
            onChange={handleChangeTextTodo}
            placeholder={
              editingTodoId !== null
                ? "Edit your task..."
                : "Write a new task..."
            }
          />

          <button className={styles.todo__submit} type="submit">
            {editingTodoId !== null ? "Save" : "Add"}
          </button>
        </form>

        <div className={styles.todo__meta}>
          <span className={styles.todo__counter}>Total: {todos.length}</span>
          <span className={styles.todo__counter}>
            Done: {todos.filter((todo) => todo.completed).length}
          </span>
        </div>

        <ul className={styles.todo__list}>
          {todos.map((todo) => (
            <TaskItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleTodo={handleToggleTodo}
              handleStartEditTodo={handleStartEditTodo}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
