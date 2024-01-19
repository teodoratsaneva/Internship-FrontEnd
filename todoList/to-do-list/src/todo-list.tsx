import React from "react";
import TodoItem, { Todo } from "./todo-item";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <ul>
      {activeTodos.map(
        (todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            toggleTodo={toggleTodo}
          />
        ))}
        {completedTodos.map(
        (todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            toggleTodo={toggleTodo}
          />
        ))
      }
    </ul>
  );
};

export default TodoList;
