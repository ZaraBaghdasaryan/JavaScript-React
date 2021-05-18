import React from "react";
import todoService from "../api/TodoService";

const ToDoDetails = (props) => 
{ const {todo, onEdit, onDelete} = props;

const handleDelete = async () => {
  const confirmationResult = window.confirm(`Are you sure you want to delete ${todo.title}?`); //Opening a window on the top right corner that asks for confirmation 
  if(confirmationResult){ //If yes, then delete through the deletedTodo variable
    const deletedTodo = await todoService.deleteTodo(todo.id);
    onDelete(deletedTodo); //Getting the deleted object 
  }
}
    return (
    <div className="todo-details">
        <h2>{todo.title}</h2>
        <p>{todo.details}</p>
        <button type="button" 
        className="link-button danger" 
        onClick={handleDelete}>
          Delete
        </button>
        <button type="button" 
        className="link-button" 
        onClick={onEdit}>
          Edit
        </button>
    </div>
  );
}

export default ToDoDetails;