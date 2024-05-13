// This is the App.js file that will be used to render different components.

import React, { useEffect } from 'react';
import AuthDetails from './components/AuthDetails';
import UserProfile from './components/profile/UserProfile';
import ReadOneDB from './renderOneEntry';

function App() {
  return (
    <div className="App">
      {/*note that I have reworked SignIn and SignUp slightly, so it is called only if the user is signed in */}
        <AuthDetails />
    </div>
  );
}

export default App;