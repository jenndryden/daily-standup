import React, { useState, useCallback } from 'react';

// COMPONENT
import ToDoList from './ToDoList';
import AddNewToDoForm from './AddNewToDoForm';

// HELPER
import { getToDoItemsFromLocalStorage, saveToDoItemsToLocalStorage } from './helper'

const ToDo = () => {
  <h1>Pizza is yummy</h1>
  // Initialize todoItems state with the JSON string stored under todo key in localStorage, if it's falsy, use an empty array instead
  const [toDoItems, setToDoItems] = useState(getToDoItemsFromLocalStorage('todo') || [])

  const [customError, setCustomError] = useState(null)

  // Event handler for adding new Todo, using useCallback to return a memoized callback.
  const addToDoHandler = useCallback(todo => {
    // Todo id should be unique and numeric >= 1, then the new Todo id should the biggest existing Todo id + 1
    let latestToDoItem = null
    if (toDoItems.length === 1) {
      latestToDoItem = toDoItems[0]
        }
        else if (toDoItems.length > 1) {
          const toDoItemsDescendingSortedById = toDoItems.sort((a, b) => a.id > b.id)
          latestToDoItem = toDoItemsDescendingSortedById[0]
        }
    
        // Add new Todo at the beginning of the array
        const newToDoItems = [
          {
            id: latestToDoItem ? latestToDoItem.id + 1 : 0,
            todo,
          },
          ...toDoItems,
        ]
    
        // Update todoItems state
        setToDoItems(newToDoItems)
    
        // Save to localStorage
        saveToDoItemsToLocalStorage('todo', newToDoItems)
      }, [toDoItems]) // Dependencies list for useCallback

      const removeToDoHandler = useCallback(id => {
        // Filter out the todoItem which is about to be removed
        const newToDoItems = toDoItems.filter(toDoItem => toDoItem.id !== id)
    
        // Update todoItems state
        setToDoItems(newToDoItems)
    
        // Save to localStorage
        saveToDoItemsToLocalStorage('todo', newToDoItems)
      }, [toDoItems])
    
      const toggleToDoDoneHandler = useCallback(id => {
        const todo = toDoItems.find(toDoItem => toDoItem.id === id)
        todo.isDone = !todo.isDone
    
        // Update todoItems state
        setToDoItems([...toDoItems])
    
        // Save to localStorage
        saveToDoItemsToLocalStorage('todo', toDoItems)
    
      }, [toDoItems])

      const editToDoHandler = useCallback((id, todo) => {
        const editingToDo = toDoItems.find(toDoItem => toDoItem.id === id)
        editingToDo.todo = todo
        // Update todoItems state
        setToDoItems([...toDoItems])
    
        // Save to localStorage
        saveToDoItemsToLocalStorage('todo', toDoItems)
    
      }, [toDoItems])

  return (
 
    <div className={style.todo}>
      <AddNewToDoForm
        customError={customError} // Passing down customError
        onAddToDo={addToDoHandler} // Passing down addTodoHandler
      />

      <ToDoList
        toDoItems={toDoItems} // Passing down todoItems
        onRemoveToDo={removeToDoHandler} // Passing down removeTodoHandler
        onToggleToDoDone={toggleToDoDoneHandler} // Passing down toggleTodoDoneHandler
        onEditToDo={editToDoHandler} // Passing down editTodoHandler
        setCustomError={setCustomError} // Passing down setCustomError
      />
    </div>
  );
}

export default React.memo(ToDo);
