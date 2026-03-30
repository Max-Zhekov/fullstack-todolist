import { useState, type ChangeEvent } from "react";
import type { Task } from "./types/task.type";
import TaskItem from "./components/Task/TaskItem";

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
  }

  function handleUpdateTodo(id: number, newText: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
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
    <div>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={text}
          onChange={handleChangeTextTodo}
          placeholder={
            editingTodoId !== null ? "Edit todo..." : "Enter todo..."
          }
        />
        <button type="submit">
          {editingTodoId !== null ? "Save todo" : "Add todo"}
        </button>
      </form>

      <ul>
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
    </div>
  );
}

export default App;
