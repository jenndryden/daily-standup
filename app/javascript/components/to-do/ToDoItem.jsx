import React, { useCallback, useRef } from 'react';

const ToDoItem = ({ todo, id, onRemoveToDo, onToggleToDoDone, onEditToDo, isDone, setCustomError }) => {
  const removeToDoHandler = useCallback(() => onRemoveToDo(id), [id, onRemoveToDo]);
  const toggleToDoDoneHandler = useCallback(() => onToggleToDoDone(id), [id, onToggleToDoDone]);

  const editToDoHandler = useCallback(event => {
    if (event.keyCode === 13) { // Detect ENTER key down
      event.preventDefault(); // Prevent adding a new line because it's supposed to be single line
     
      const { value } = event.target;

      if (value.length < 3) {
        setCustomError('Todo text is too short.');

        return;
      }

      if (value.length > 20) {
        setCustomError('Todo text is too long.');

        return;
      }
      
      onEditToDo(id, event.target.value);

      setCustomError(null) // Reset customError

      event.target.blur(); // Make the current input lost focus after finishing onEditTodo
    }
  }, [id, onEditToDo, setCustomError]);

  const checkboxRef = useRef(null);

  return (
    <li>
      <input
        type="checkbox"
        ref={checkboxRef}
        checked={!!isDone}
        onChange={toggleToDoDoneHandler}
      />
      <span onClick={() => checkboxRef.current.click()}  />
      <input
        type="text"
        defaultValue={todo} // innerHTML of the editable div
        onKeyDown={editToDoHandler} // handle innerHTML change
        style={{textDecoration: isDone ? 'line-through' : 'none'}}
      />
      <button onClick={removeToDoHandler}>
        <span role="img" aria-labelledby="trash" />🗑️
      </button>
    </li>
  )
};

export default React.memo(ToDoItem);