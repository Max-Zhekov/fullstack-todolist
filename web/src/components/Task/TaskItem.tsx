import type { Task } from "../../types/task.type";
import styles from "./TaskItem.module.scss";

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
    <li
      className={`${styles.task} ${
        todo.completed ? styles["task--completed"] : ""
      }`}>
      <label className={styles.task__check}>
        <input
          className={styles.task__checkbox}
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo.id)}
        />
        <span className={styles.task__customCheckbox}></span>
      </label>

      <div className={styles.task__content}>
        <p className={styles.task__text}>{todo.text}</p>
      </div>

      <div className={styles.task__actions}>
        <button
          className={`${styles.task__button} ${styles["task__button--edit"]}`}
          onClick={() => handleStartEditTodo(todo)}
          type="button">
          Edit
        </button>

        <button
          className={`${styles.task__button} ${styles["task__button--delete"]}`}
          onClick={() => handleDeleteTodo(todo.id)}
          type="button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
