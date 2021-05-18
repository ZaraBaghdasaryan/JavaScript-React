function createToDoApiService() {

    const apiAddress = "http://localhost:3001/";

    return {

        getTodos: async () => 
        {
            const result = await fetch(`${apiAddress}/todo`);
            if(result.ok)   //To ensure that the result is recieved
            {
                return await result.json();
            }
        },


        createTodo: async (title, description) => 
        
        {
            const todo = { //Objekt som vi ska göra om till json 
                title:title,
                description:String (optional)
            };

            const result = await fetch(`${apiAddress}/todo`, 
            
            {
                method: "POST",
                headers: {"Content-Type": "application/json"}, //For the file to be read as json
                
                body: JSON.stringify(todo) //Turning the todo to JSON text (1 big interconnected string)
           
            });

            if(result.ok)   
            {
                return await result.json();
            }
            
        },

        updateTodo: async (id, updatedTodo) => {

            
            const result = await fetch(`${apiAddress}/todo/${id}`, 
            
           
            {
                method: "PUT",
                headers: {"Content-Type": "application/json"}, 
                
                body: JSON.stringify(updatedTodo) 
           
            });

            if(result.ok)   
            {
                return await result.json();
            }

        },

        deleteTodo: async (id) => {
            const result = await fetch (`${apiAddress}/todo/${id}`,
            {   
                method: "DELETE",
            });  

            if(result.ok)   
            {
                return await result.json();
            }
        },
    };
}