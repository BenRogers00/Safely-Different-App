// This is the App.js file that will be used to render different components.

import React from 'react';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AuthDetails from './components/AuthDetails';

function App() {
  return (
    <div className="App">
        <SignUp />
        <SignIn />
        <AuthDetails />
    </div>
  );
}

export default App;