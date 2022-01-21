import React, {useState} from 'react';
import Header from './components/Header.js';
import List from './components/List.js';
import Signup from './components/auth/signup.js';
import Login from './components/auth/login.js';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [loginError, setloginError] = useState(null);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Routes> 
          <Route path="/" element={loggedIn ? <List /> : <Login loggedIn={loggedIn} 
                                          setloggedIn={setloggedIn} 
                                          loginError={loginError}
                                          setloginError={setloginError}/>} />
          <Route path="signup" element={<Signup 
                                          loggedIn={loggedIn} 
                                          setloggedIn={setloggedIn} 
                                          signupError={signupError}
                                          setSignupError={setSignupError} />} />
          <Route path="login" element={<Login 
                                          loggedIn={loggedIn} 
                                          setloggedIn={setloggedIn} 
                                          loginError={loginError}
                                          setloginError={setloginError}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
