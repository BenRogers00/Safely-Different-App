// This file contains the TodoList component that will display the list of todos. 
// It will receive the todos array as a prop and render the list of todos. 
// If there are no todos, it will display a message saying "No tasks to display."
import React from 'react';

function TodoList({ todos }) {
    return (
        <div>
            {todos.length > 0 ? (
                <ul>
                    {todos.map((todo, index) => <li key={index}>{todo}</li>)}
                </ul>
            ) : (
                <p>No tasks to display.</p>
            )}
        </div>
    );
}

export default TodoList;
