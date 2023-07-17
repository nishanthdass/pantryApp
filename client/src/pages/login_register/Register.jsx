import React, { useState } from "react"
import { Link } from 'react-router-dom';

export const Register = (props) => {
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email)
        console.log(username)
        console.log(password)    
    }


    return (
        <>
        <div className="login-register-page">
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email"><b>Email:</b></label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" placeholder="example@domain.com" id="email" name="email" required></input>
            </div>
            <div>
            <label htmlFor="username"><b>Username:</b></label>
            <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="user" id="username" name="username" required></input>
            </div>
            <div>
            <label htmlFor="password"><b>password:</b></label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="*********" id="password" name="password" required></input>
            </div>
            <button>Register</button>
        </form>
        <div className="register-wrapper">
        already registered?<Link onClick={()=>props.onFormChange('loginPage')}>Login here</Link>
        </div>
        </div>
        </div>
        </>
    )
}


