import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import loginImage from '../images/login.svg';
import { addSignup } from '../../async.js';

function Signup() {
    const [signupInput, setsignupInput] = useState({
        username: '',
        password: ''
    });

    const [loggedIn, setloggedIn] = useState(false);
    const [signupError, setSignupError] = useState(null);

    async function onSignup(e) {
        e.preventDefault();
        console.log(signupInput);

        const {username, password} = signupInput; 
        const userSignup = {
            username,
            password
        };
        const userData = await addSignup(userSignup);
        if (userData.isLoggedIn) {
            setloggedIn(true);
        } else {
            setSignupError(`${userData.errorMessage}`);
        }
    }


    if (loggedIn) {
        return <Navigate to="/" />
    }

    return (
        <div className="container">
            <div className="header">Register</div>
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
                            value={signupInput.username} 
                            onChange={e => setsignupInput({...signupInput, username: e.target.value})}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            value={signupInput.password} 
                            onChange={e => setsignupInput({...signupInput, password: e.target.value})}>
                        </input>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="submitBtn" onClick={onSignup}>Signup</button>
            </div>
            <div className='error'> {signupError && <h3>{signupError}</h3>}</div>
        </div>
    )
}

export default Signup; 