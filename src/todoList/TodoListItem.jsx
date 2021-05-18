import React, { useState } from "react";
import todoService from "../api/TodoService";

const ToDoListItem = (props) => 
{
    const [completed, setCompleted] = useState(props.todo.completed);
    const {todo, isSelected, onClick, onSave} = props; {/*Destructuring the todo object from its properties, getting it as 1 object */}
    let className ="todo-list-item";
    if(isSelected){
        className += " todo-list-item--selected"; {/*isSelected is true => shows as selected*/} 
    }

    if(completed){
      className += " todo-list-item--completed"; 
  }
  const handleSave = async () => { //Instead of const handleSave = async () => {}, the syntax could be - async function handleSave() {}, which is essentially the same thing, only you can't use the this marker with it ...
    {        
      const updatedTodoInfo = {
        ...props.todo,
        completed: !completed
        //If you want you can even add new fields in here, ex. - timeplan: ""
      };
      const updatedTodo = await todoService.updateTodo(props.todo.id, updatedTodoInfo); //And through updatedTodo variable using the todoService's updateTodo method that takes in the id and the new information of the todo
      setCompleted(updatedTodo.completed); 

    }
  };

    const handleClick = () => {
      if (onClick) {
        onClick(todo);
      }
    }
    return(
    
      <li className={className} onClick={handleClick}>
      <div className="todo-list-item__info">
        <h3>{props.todo.title}</h3>
        <p>{todo.details}</p>
        <input type="checkbox"
    onChange={(event) => {handleSave();}}
    defaultChecked = {completed}/>
    
      </div>
    </li> 
   
    );
};


export default ToDoListItem;