import axios from 'axios';
const apiUrl = 'https://app-mern-todolist.herokuapp.com';


export const getTasks = () => axios.get(`${apiUrl}/show`)
    .then(response => response.data)
    .catch(err => console.log(err));

export const addTask = task =>  axios.post(`${apiUrl}/create`, task)
    .then(res => console.log('task created ' + res.data))
    .catch(err => console.log(err));

export const updateTask = (id, task) => axios.put(`${apiUrl}/update/${id}`, task)
    .then(res => console.log('Updated task ' + res.statusText))
    .catch(err => console.log(err));

export const deleteTask = id => axios.delete(`${apiUrl}/delete/${id}`)
    .then(res => console.log('deleted task ' + res.statusText))
    .catch(err => console.log(err));


