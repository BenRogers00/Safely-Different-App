import React, { useState, useEffect } from 'react';
import axios from 'axios';

// To-Do List component
function TodoList({ user_id }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Fetch tasks on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get(`/todo.php?user_id=${user_id}`);
            setTasks(response.data);
        };
        fetchTasks();
    }, [user_id]);

    // Add a new task
    const addTask = async () => {
        await axios.post('/todo.php', { user_id, task: newTask });
        setTasks([...tasks, { id: tasks.length, task: newTask }]); // just to add manually, in production, refresh or reset this.
        setNewTask('');
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.task}
                        <button onClick={async () => {
                            await axios.delete(`/todo.php?id=${task.id}`);
                            setTasks(tasks.filter(t => t.id != task.id)); // or refetch
                        }}>Delete</button>
                    </li>
                ))}
            </ul>

            <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="New task..." />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

export default TodoList;
