import React from 'react'
import SingleTask from './SingleTask';

export default function TaskList({tasks, toggleTodo, handleDelete}) {
   
  return (
    tasks.map(task => {
        return <SingleTask 
            key={task._id} 
            {...task} 
            toggleTodo={toggleTodo} 
            handleDelete={handleDelete}
        />
        })
    )
}