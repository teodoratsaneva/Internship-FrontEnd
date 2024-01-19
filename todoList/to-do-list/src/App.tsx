import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./todo-list";
import TodoForm from "./todo-form";
import Button from "@mui/material/Button";
import { Todo } from "./todo-item";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: string) => {
      const newTodoItem: Todo = {
        id: uuidv4(),
        text: newTodo,
        completed: false,
      };

      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <Button
        className="RemoveButton"
        variant="outlined"
        onClick={removeCompletedTodos}
      >
        Remove completed tasks
      </Button>
    </div>
  );
};

export default App;
