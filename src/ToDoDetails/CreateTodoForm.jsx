import React, { useState } from "react";
import todoService from "../api/TodoService";

const CreateTodoForm = (props) => 
{
 const {onCancel, onSave} = props;

 const [description, setDescription] = useState(""); //Variables that will hold the changed values/ Use the state and store the changed values 
 const [details, setDetails] =useState("");
 const isValid = description !== ""; //Setting only description as not empty so that the user won't need to fill in details to be able to save the Todo


 const handleSave = async () => {    //Eventhandler for onSave
  if(isValid && onSave) { //If isValid is true and there is a onSave function then create a new Todo
    const newTodo ={
      // id: Date.now().toString(), //Just to create a unique id, it is Generated automatically by the API
      title: description,
      details: details,
      // created: Date.now() //Same 
    };

    const createdTodo = await todoService.createTodo(newTodo);
    setDescription("");//Showing the fields as empty in the CreateTodo view after we have added the new todo
    setDetails(""); 
    onSave(createdTodo); //onSave create a new Todo!! Yuhuuu!! 
   
  }
 };

  return (
    <form id="todo-form">
    <h2>Create Todo</h2>
    <label>Description</label>
    <input 
    name="description" 
    required value={description} 
    onChange={(event) => setDescription(event.target.value)} //onChange of the event targetting the input field and changing the value of the description
    />
    <label>Details</label>
    <input 
    name="details" 
    value ={details}
    onChange={(event) => setDetails(event.target.value)} 
    />
    <br />
    <button type="button" className="link-button" onClick={onCancel}>
      Cancel
    </button>
    <button type="button" className="primary" onClick={handleSave} disabled={!isValid}> {/*Save is invisible when the isValid is untrue (nothing is written in the description)*/}
      Save
    </button>
  </form>);
}

export default CreateTodoForm;