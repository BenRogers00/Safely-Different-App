import WriteToDatabase from './databaseWriting';

function WriteButton({value}) {
    //functionality for button, just gets the inputted value, and calls WriteToDatabase with the correct path
    const handleClick = () => {
        WriteToDatabase({dataInput: { value }}, 'writingTest/textFieldTest1')
    };

    return (
        //display button
        <div>
            <button onClick={handleClick}>Write to database</button>
        </div>
    );
}

export default WriteButton;
