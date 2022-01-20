import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import loginImage from '../images/login.svg';
import { getLogin } from '../../async.js';

function Login() {
    const [loginInput, setloginInput] = useState({
        username: '',
        password: ''
    });

    const [loggedIn, setloggedIn] = useState(false);

    async function onLogin() {
        const {username, password} = loginInput; 
        const userLogin = {
            username, 
            password
        }
        const userData = await getLogin(userLogin);
        if (userData.isLoggedIn) {
            setloggedIn(true);
        }
        console.log(userData);
        console.log('click works!')
    }

    if (loggedIn) {
        return <Navigate to="/" />
    }

  return (
      <div className="container">
          <div className="header">Login</div>
          <div className="content">
              <div className="image">
                  <img src={loginImage} />
              </div>
              <div className="form">
                  <div className="form-group">
                      <label>Username</label>
                      <input 
                        type="text" 
                        name="username" 
                        placeholder="username" 
                        value={loginInput.username} 
                        onChange={e => setloginInput({...loginInput, username: e.target.value})}>
                       </input>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        value={loginInput.password} 
                        onChange={e => setloginInput({...loginInput, password: e.target.value})}>
                      </input>
                  </div>
              </div>
          </div>
          <div className="footer">
              <button type="button" className="submitBtn" onClick={onLogin}>Login</button>
          </div>
      </div>
  )
}

export default Login; 