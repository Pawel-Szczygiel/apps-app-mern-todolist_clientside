import React from 'react'

export default function Todo({_id, todo, completed , toggleTodo, handleDelete }) {
  
  const handleCheck = () => {
    toggleTodo(_id);
  }

  const handleDeleteButton =  () => {
    handleDelete(_id);
  }
   
  const color = completed ? 'lightseagreen' : 'rgba(255, 255, 255, 0.25)'; 

  return (
    <div className="todo-list">
        <label>
            <input type="checkbox" checked={completed}  onChange={handleCheck}/>
            <span className="text"  style={{color}}>{todo}</span>
        </label>
        <button onClick={handleDeleteButton}>
            delete
        </button>
    </div>
  )
}