import React from 'react';
import Checkbox from '@mui/material/Checkbox';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }  

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  toggleTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleTodo }) => {
  return (
    <li key={id}>
      <Checkbox
        checked={completed}
        onChange={() => toggleTodo(id)}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</span>
    </li>
  );
};

export default TodoItem;
