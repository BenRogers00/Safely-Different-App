// Manage and display a counter value, and provides buttons to increment and decrement the counter.
import React, { useState } from 'react';

function Counter() {
    // useState is a hook that allows you to add state to functional components
    const [count, setCount] = useState(0);

    // The first element in the array is the current state value, 
    // and the second element is a function that allows you to update the state value
    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

// The Counter component manages a counter value and provides buttons to increment and decrement the counter
export default Counter;
