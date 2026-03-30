import type { Task } from "../../types/task.type";

type TaskProps = {
  todo: Task;
  handleDeleteTodo: (id: number) => void;
  handleToggleTodo: (id: number) => void;
  handleStartEditTodo: (todo: Task) => void;
};

const TaskItem = ({
  todo,
  handleDeleteTodo,
  handleToggleTodo,
  handleStartEditTodo,
}: TaskProps) => {
  return (
    <li>
      <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.text}
      </p>

      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
      <button onClick={() => handleStartEditTodo(todo)}>Edit</button>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)}
      />
    </li>
  );
};

export default TaskItem;
