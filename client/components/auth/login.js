import React, { useState } from 'react';
import loginImage from '../images/login.svg';
import { getLogin } from '../../async.js';
import Signup from './signup.js';
import {Redirect} from 'react-router-dom'

function Login({loggedIn, setloggedIn, loginError, setloginError}) {
    const [loginInput, setloginInput] = useState({
        username: '',
        password: ''
    });

    async function onLogin() {
        const {username, password} = loginInput; 
        const userLogin = {
            username, 
            password
        }
        const userData = await getLogin(userLogin);
        if (userData.isLoggedIn) {
            setloggedIn(true);
        } else {
            setloginError(`${userData.errorMessage}`);
        }
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
              <button type="button" className="signupBtn" onClick={()=> window.location.href='/signup'}>Sign Up Now</button>
          </div>
          <div className='error'> {loginError && <h3>{loginError}</h3>}</div>
      </div>
  )
}

export default Login; 