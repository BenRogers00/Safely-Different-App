import {userState} from "react";
//Contains the form fields and submit button
//Handles the form submission and validation

function Form() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        //Hands form submission here
    };

    const handleUsernameChange = (event) =>{
        setUserName(event.target.value);
    };

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    };

    return(
        <form onSubmit = {handleSubmit}>
            <UsernameInput value = {username} onChange = {handleUsernameChange} />
            <PasswordInput value = {password} onChange = {handlePasswordChange} />
            <SubmitButton />
        </form>
    );
}