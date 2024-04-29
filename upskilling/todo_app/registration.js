import React, { useState } from 'react';
import axios from 'axios';

// Registration component
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle registration button click
    const handleRegister = async () => {
        try {
            // Send registration request
            await axios.post('/register.php', { username, password });
            alert("Registration successful!");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed!");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
