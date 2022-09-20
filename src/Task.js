import React, { useState, useEffect } from 'react';

import { 
    addTask, 
    getTasks, 
    updateTask, 
    deleteTask,
} from "./services/taskServices";

import TaskList from './TaskList';


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInput] = useState('');


    async function getData(){
        try {
                setTasks( await getTasks())
            }
         catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData();
    }, [inputValue]);
    

    const handleAddTodo = async () => {
       
        if (!!inputValue.length) {
            const task = {
                todo: inputValue.trim()
            }
            await addTask(task);
            setInput('');
        }
    }

    const handleChange = e => setInput(e.target.value);
    
    const toggleTodo = async id => {
           
            const editTask = tasks.find(task => task._id === id); 
            editTask.completed = !editTask.completed;   

            const newTasks = tasks.map(task => {
                if (task._id === id) {
                    return {...editTask};
                }
                return task;
            });
            
            setTasks(newTasks);
            await updateTask(id, editTask);
    }

    const handleDelete = async id => {
        try {
            const newTasks = tasks.filter(task => task._id !== id);
            setTasks(newTasks)
            await deleteTask(id);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClearChecked = async ()  => { 

        try {
            const completedTasks = tasks.filter( task => task.completed );
            const inCompletedTasks = tasks.filter( task => !task.completed );

            if (!!completedTasks.length) {
                setTasks(inCompletedTasks);
                for (let task of completedTasks) {
                    await deleteTask(task._id);
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    }

    return ( 

        <div className='todo-box'>
            <div className="input-box">
                <input className="inputTodo" onChange={handleChange} type='text' value={inputValue} />
                <span>todo...</span>
            </div>
            <div className='buttons-box'>
                <button onClick={handleAddTodo} >add todo</button>
                <button onClick={handleClearChecked} >clear completed</button>
            </div>
            <TaskList tasks={tasks} toggleTodo={toggleTodo} handleDelete={handleDelete}/>
            
            <div className="info-left">
                {tasks.length > 0 ? <h3>{tasks.length} left to do</h3> : ''}    
            </div>
        </div>

    );
}
 
export default Tasks;