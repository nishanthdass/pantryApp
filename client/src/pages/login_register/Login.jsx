import React, { useState } from "react"
import { Link } from 'react-router-dom';


export const Login = (props) => {
    
    const [emailuser, setEmailUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(emailuser)
        console.log(password)   
        props.onLogin(emailuser, password);
    }


    return (
        <>
        <div className="login-register-page">
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="emailuser"><b>Email or User name:</b></label>
            <input value={emailuser} onChange={(event) => setEmailUser(event.target.value)} type="text" placeholder="example@domain.com or user name" id="emailuser" name="emailuser" required></input>
            </div>
            <div>
            <label htmlFor="password"><b>password:</b></label>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="*********" id="password" name="password" required></input>
            </div>
            <div>
            <button type="submit">LogIn</button>
            </div>
        </form>
        <div className="register-wrapper">
        Not registered yet? <Link onClick={()=>props.onFormChange('registerPage')}>Register here</Link>
        </div>
        </div>
        </div>
        </>
    )
}


