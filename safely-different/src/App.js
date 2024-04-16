import logo from './images/fssLogo.jpg';
import './App.css';
import DatabaseDisplayButton from './databaseDisplayButton';
import WriteButton from './databaseWritingButton';
import TextField from './textFieldTest';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the beginning of the Safely Different App!
        </p>
        <DatabaseDisplayButton />
        <p>textFieldTest: </p>
        <TextField />
      </header>
    </div>
  );
}

export default App;
