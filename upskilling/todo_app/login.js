import React, { useState } from 'react';
import axios from 'axios';

// Login component
function Login({ setUserId }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle login button click (similar to registration)
    const handleLogin = async () => {
        try {
            const response = await axios.post('/login.php', { username, password });
            if (response.data.status === 'success') {
                setUserId(response.data.user_id);
            } else {
                alert("Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
