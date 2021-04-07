import React from 'react';

// COMPONENT
import ToDoItem from './ToDoItem';

const ToDoList = ({ toDoItems, onRemoveToDo, onToggleToDoDone, onEditToDo, setCustomError }) => {
  return (
    <ul>
      {
        toDoItems && // Check if todoItems exists
        Array.isArray(toDoItems) && // Check if it's an array
        toDoItems.length > 0 && // The array should not be empty
        toDoItems.map(({ id, todo, isDone }) => ( // If all conditions are met, we render a list of todo items
          <ToDoItem
            key={id}s
            id={id}
            todo={todo}
            onRemoveToDo={onRemoveToDo}
            onToggleToDoDone={onToggleToDoDone}
            onEditToDo={onEditToDo}
            isDone={isDone}
            setCustomError={setCustomError}
          />
        ))
      }
    </ul>
  )
};

export default React.memo(ToDoList); 