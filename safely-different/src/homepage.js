//Displays the login page components on a React live server

import React, { userState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import UsernameInput from 'usernameRender';
import PasswordInput from 'passwordRender';
import SubmissionButton from 'submitbuttonRender';
import HelpLink from 'helplinkRender';

const LoginPage = () => {
    const [username, setUserName] = userState('');
    const [password, setPassword] = userState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <div>
            <Logo />
            <form onSubmit = {handleSubmit}>
                <UsernameInput value = {username} onChange ={(e) => setUsername(e.target.value)} />
                <PasswordInput value = {password} onChange ={(e) => setPassword(e.target.value)} />
                <SubmitButton />
            </form>
            <HelpLink />
        </div>
    );
};

export default LoginPage;