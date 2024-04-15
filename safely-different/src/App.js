import logo from './images/fssLogo.jpg';
import './App.css';
import DatabaseButton from './databaseButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the beginning of the Safely Different App!
        </p>
        <DatabaseButton />
      </header>
    </div>
  );
}

export default App;
