// This is the App.js file that will be used to render different components.
import React from 'react';
import AuthDetails from './components/AuthDetails';
import TextField from './textFieldtoDb';
import BlogWriter from './components/blogPosts/blogWriter';
import BlogDisplay from './components/blogPosts/blogPostDisplay';

function App() {
  return (
    <div  style={{backgroundColor:'#282c34'}}>
    <div className="App">
      {/*note that I have reworked SignIn and SignUp slightly, so it is called only if the user is signed in */}
        <AuthDetails />
        <TextField/>
        <h1>Blog Writer:</h1>
        
        <BlogWriter/>
        
    </div>
    <div>
    <BlogDisplay/>
    </div>
    </div>
  );
}

export default App;