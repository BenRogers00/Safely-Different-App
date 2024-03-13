//Rendering password input field. 
//Stores current value value of input and handles changes to the value

function PasswordInput({value, onChange}){
    return(
        <input
        type = "password"
        value = {value}
        onChange = {onChange}
        placeholder = "Password"
        />
    );
}

export default passwordRender;