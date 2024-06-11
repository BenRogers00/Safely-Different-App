//redundant, can be deleted with check from the team

import React, { useState } from 'react';
import useCheckExistsInDB from './checkIfExistsInDB';
import useCheckValueInDB from './checkValueInDB';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResult, setLoginResult] = useState('');

    const noDotUsername = username.replace(/\./g, '~');
    const usernameExists = useCheckExistsInDB('users/'+noDotUsername);
    const passwordCorrect = useCheckValueInDB('users/'+noDotUsername+'/password', password);

    const HandleLogin = () => {
        if (noDotUsername === '' || password === '') {
            setLoginResult('Please enter both username and password. Fields cannot be blank');
        } else {
            if (usernameExists === true) {
                console.log("user found, checking password")
                if(passwordCorrect === true)
                    {
                        setLoginResult(`User: ${username}\nPassword: ${password}\nLogin Successful!`);
                        console.log("login success")
                    }
                    else{
                        setLoginResult('login fail, user found, password incorrect')
                    }
            } else {
                setLoginResult(`Login fail, user not found`);
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); HandleLogin(); }}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>

            <p id="result">{loginResult}</p>
        </div>
    );
}

export default Login;