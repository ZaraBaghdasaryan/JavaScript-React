const apiAddress ="http://localhost:3001/todo"; //Specifying the API address

const todoService = {
    getAll: async () => {
        const response = await fetch(apiAddress); //Get all aynchronous calls towards the API through the response varaible  
        if(response.ok){
            const result = await response.json(); //If successful, then save the result in the response variable and through result variable turn the response into a json text format and return through the result variable
            return result;
        }
        throw new Error({
            status: response.status,            //Throw exception if it fails
            statusText: response.statusText,
        });
    },

    createTodo: async (newTodo) => {
        const response = await fetch(apiAddress, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", //Turning the response into a json text format (With Axios this would have been done automatically)
            },
            body: JSON.stringify(newTodo)
        });

        if(response.ok){
            const result = await response.json(); //If successful, then save the result in the response variable and through result variable turn the response into a json text format and return through the result variable
            return result;
        }
        throw new Error({
            status: response.status,            //Throw exception if it fails
            statusText: response.statusText
        });
    },

    deleteTodo: async(id) => {
        const response = await fetch(`${apiAddress}/${id}`,
         {method: "DELETE"});
        if(response.ok){
            const result = await response.json(); 
            return result;
        }
        throw new Error({
            status: response.status,            
        });
    },

    updateTodo: async (id, updatedTodo) => {
        const response = await fetch (`${apiAddress}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodo) 
        });
        if(response.ok){
            const result = await response.json(); 
            return result;
        }
        console.log(response.statusText)
        throw new Error({
            status: response.status,            
            statusText: response.statusText
        });
    },
};

export default todoService; 