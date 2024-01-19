import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface TodoFormProps {
  addTodo: (newTodo: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div>
      <TextField
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        id="outlined-textarea"
        label="To-do"
        placeholder="Type..."
        multiline
      />
      <Button className="AddButton" variant="outlined" onClick={handleAddTodo}>
        Add
      </Button>
    </div>
  );
};

export default TodoForm;
