import { useState, type ChangeEvent } from "react";
import type { Task } from "./types/task.type";
import TaskItem from "./components/Task/TaskItem";
import styles from "./App.module.scss";

const dummyTodos: Task[] = [
  { id: 1, text: "Изучить Express", completed: false },
  { id: 2, text: "Подключить React frontend", completed: true },
  { id: 3, text: "Сделать CRUD для todo", completed: false },
];

function App() {
  const [todos, setTodos] = useState<Task[]>(dummyTodos);
  const [text, setText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) return;

    if (editingTodoId !== null) {
      handleUpdateTodo(editingTodoId, text.trim());
      setText("");
      setEditingTodoId(null);
      return;
    }

    const newTodo: Task = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: text.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  function handleDeleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    if (editingTodoId === id) {
      setEditingTodoId(null);
      setText("");
    }
  }

  function handleUpdateTodo(id: number, newText: string) {
    const trimmedText = newText.trim();
    if (!trimmedText) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    );
  }

  function handleStartEditTodo(todo: Task) {
    setText(todo.text);
    setEditingTodoId(todo.id);
  }

  function handleChangeTextTodo(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleToggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
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
