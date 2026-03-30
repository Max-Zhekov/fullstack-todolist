let todos = require("../data/todos");

const getTodos = (req, res) => {
  res.json(todos);
};

const createTodo = (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Text is required" });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text: text.trim(),
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const deleteTodo = (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: "Todo deleted" });
};

const updateTodo = (req, res) => {
  const id = Number(req.params.id);
  const { text, completed } = req.body;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (typeof text === "string") {
    todo.text = text.trim();
  }

  if (typeof completed === "boolean") {
    todo.completed = completed;
  }

  res.json(todo);
};

module.exports = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
