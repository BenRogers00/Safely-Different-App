//Rendering username input field. 
//Stores current value value of input and handles changes to the value

function UsernameInput({value, onChange}) {
    return(
        <input
        type = "text"
        value = {value}
        onChange = {onChange}
        placeholder = "Username"
        />
    );
}

export default usernameRender;