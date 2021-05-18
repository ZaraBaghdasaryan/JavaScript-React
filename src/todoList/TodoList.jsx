import React from "react";
import ToDoListItem from "./TodoListItem";


const ToDoList = (props) => 
{
  
  const {todo, selectedTodo} =props; //Getting the id only

  const handleTodoClicked =(todo) => { //const handleTodoClicked - a variable that is a reference for a function, pointing at a function
    if (props.onTodoSelected) {
      props.onTodoSelected(todo);   
  }
  };

    return (
    <ul className="todo-list">
      {todo.map((todo) => 
      (<ToDoListItem                  //Sending the function reference variable as one of the values of 3 propertis of ToDoListItem (onClick, key, todo, isSelected)
        onClick={handleTodoClicked}   // Eventhandler, handles an event that is connected to onTodoSelected={setSelectedTodo} in the App.js and changes the state of the object once clicked
        key={todo.id}     
        todo={todo} 
        isSelected={todo === selectedTodo}
       // isFiltered ={todo === filteredTodo}
      //  onFilter ={handleFilteredTodo}
      />
      ))} {/* Map (array function) creates 1 ListItem for each Todo, puts the Todo in a list, returns an array 
       Id is specified so that React will know which todo to update  */}
    </ul>
    );

};
//Börja med att bygga händelser (TodoSelected/TodoClicked) och sen reaktioner till händelser (handleTodoClicked osv.)


export default ToDoList; 


