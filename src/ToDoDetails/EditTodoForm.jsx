import React, { useState } from "react";
import todoService from "../api/TodoService";

const EditTodoForm = (props) => 
{
const {todo, onCancel, onSave} = props;

const[description, setDescription] = useState(props.todo.title); //Using the current states of description and details
const[details, setDetails] =useState(props.todo.details);
const isValid = description !==""; //When the description is present (not empty)



const handleSave = async () => { //Instead of const handleSave = async () => {}, the syntax could be - async function handleSave() {}, which is essentially the same thing, only you can't use the this marker with it ...
  if(isValid && onSave) {         // => is equivalent to a function 
    const updatedTodoInfo = {
      ...todo, //A copy of existing todo 
      title: description, //New values being saved in property value fields and stored in the updatedTodo variable
      details: details
      //If you want you can even add new fields in here, ex. - timeplan: ""
    };
    const updatedTodo = await todoService.updateTodo(props.todo.id, updatedTodoInfo); //And through updatedTodo variable using the todoService's updateTodo method that takes in the id and the new information of the todo
    onSave(updatedTodo); //And eventually, onSave stores the updated version of todo
  }
};
    return (
    <form id="todo-form">
    <h2>Edit Todo</h2>
    <label>Description</label>
    <input 
    description="description"
    required value={description} 
    onChange={(event) => setDescription(event.target.value)}
    />
    
    
    <label>Details</label>
    <input 
    name="details" 
    value={details} 
    onChange={(event) => setDetails(event.target.value)}
    />
    <br />
    <button type="button" className="link-button" onClick={onCancel}>
      Cancel
    </button>
    <button 
    disabled ={!isValid} //If the editing field is empty then disable the save button
    type="button" 
    className="primary" 
    onClick={handleSave}>
      Save
    </button>
  </form>);
}

export default EditTodoForm;