export const getToDoItemsFromLocalStorage = key => {
    const value = localStorage.getItem(key); // Get the JSON string stored with provided key in localStorage
  
    let toDoItems = null; // Initialize todoItems variable to be assigned a final value later on
  
    // Using try catch to avoiding exception to be thrown if the JSON string is invalid
    // It may be a normal string and we can't JSON.parse it
    try {
      const parsedJSON = JSON.parse(value);
  
      if (Array.isArray(parsedJSON)) {
        toDoItems = parsedJSON;
      }
    } catch(e) {
      // If it's not a valid JSON string, then we should initialize an empty array for todoItems
      toDoItems = [];
    }
  
    return toDoItems;
  }
  
  // This one is quite straightforward, it better have a comment too :))
  export const saveToDoItemsToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data)); 
  