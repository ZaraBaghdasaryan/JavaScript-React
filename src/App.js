import logo from './logo.svg';
import './App.css';
import ToDoList from './todoList/TodoList';
import ToDoDetails from './ToDoDetails/ToDoDetails';
import CreateTodoForm from './ToDoDetails/CreateTodoForm';
import EditTodoForm from './ToDoDetails/EditTodoForm';
import { useEffect, useState } from 'react';
import todoService from './api/TodoService';


const viewModes = { //To skip using string "View" everywhere since its not such a good practice 
  view: "View",
  edit: "Edit",
  create: "Create",
};


function App() {

  const [todo, setTodo] = useState ([]);

  const [selectedTodo, setSelectedTodo] = useState(todo); 

  const[viewMode, setViewMode] = useState(viewModes.create);

  const showCreateForm = () => {
    setViewMode(viewModes.create);
    setSelectedTodo(null);

  }
  const selectTodo = (todo) => {
    setSelectedTodo(todo); //Marking the todo as selected in the list
    setViewMode(viewModes.view);//Changing the viewMode to view
  }

  const handleTodoSave = (newTodo)=> {
    const newArray =[...todo, newTodo]; //...todo remembers all the prior ones and then adds the new one to the array with newTodo
    setTodo(newArray); //Updating the array
    selectTodo(newTodo);//Implementing the selectTodo function
    
  };

  const handleTodoUpdate = (updatedTodo) => { //Showing the updated todo in the list
    const newArray = todo.slice(); //Creating a copy of the array
    for (var i = 0; i < newArray.length; i++) {//Looping through the array till we find the updated version
        if(newArray[i].id === updatedTodo.id){ //If the todo from array matches the one of the updated todo
          newArray[i] = updatedTodo;          //Replace the old one with the updated version in the list
          break                               //Break to stop looping
        }
    }
    setTodo(newArray);    //Show the new list        
    selectTodo(updatedTodo); //Show the updated todo
  }

  const handleTodoDeleted = (deletedTodo) => {
    setTodo(todo.filter(todo => todo.id !== deletedTodo.id)); //To filter out the deleted todo, we ask the Createform view to show us all the todos whose Ids are not the same as the Deleted Todo's
    //getTodos(); unlike the abovementioned filtering option, this one connects to the API and returns the entire list that is left, which is also an alternative, however API connections may affect the performance and the speed of the operation 
    showCreateForm();
  }


  const getTodos = async () => {
    const todos = await todoService.getAll(); //Implementing the TodoSerice we created in the TodoService.js
    setTodo(todos);
  }

  useEffect(() => { //Is implemented on Start and retrieves all the todos through API
    getTodos();
  }, []);

 
  const renderMainSection = () => {
    if (!selectedTodo || viewMode === viewModes.create ) { //If there is no selected person or the view mode is on Create- then show the Create view
      return (
         <CreateTodoForm 
        onCancel={() => setViewMode(viewModes.view)} 
        onSave={handleTodoSave} //Implementing handleTodoSave onSave click
        /> 
      );
      
    }
    switch (viewMode) {
      case viewModes.view:
        return <ToDoDetails 
        todo={selectedTodo} 
        onDelete={handleTodoDeleted}
        onEdit={() => setViewMode(viewModes.edit)}/>; //After choosing Edit being directed to viewMode Edit
      case viewModes.edit:
        return <EditTodoForm 
        todo={selectedTodo} 
        onCancel={() => setViewMode(viewModes.view)} 
        onSave={handleTodoUpdate}/>;  //While editing choosing either to cancel or save and being redirected to respective views
      
      default:
        return null;
    }
  };

  const handleTodoSelected = (todo) => {
    setSelectedTodo(todo);
    setViewMode (viewModes.view);
  };

  return (
    <main>
      <aside>
        <h1 className="list-title"> {/*class is a reserved name*/}
          My To Dos 
          <button 
          id="button-add-person" 
          className="primary" 
          onClick={showCreateForm}> {/*Brilliantly using the Create case in ViewMode we just created*/}
            Add
          </button> 
        </h1>
        <ToDoList 
        todo={todo} 
        selectedTodo ={selectedTodo} 
        onTodoSelected={handleTodoSelected}/> 
      </aside>
      <section>
        {renderMainSection()}
        {/* <CreateTodoForm/>
        <ToDoDetails todo={selectedTodo}/>  {/* to See/Edit the details of the selected todo */}
        {/* <EditTodoForm todo={selectedTodo}/>  Instead of all these 3 simply rendering with renderMainSection*/} 
      </section> 
    </main>
  );
}

export default App;
