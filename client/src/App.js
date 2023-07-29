import React, { useState , useEffect } from "react"
import './App.css';
import axios from 'axios';
import {Route, Routes, Navigate} from 'react-router-dom';
import Sidebar from './pages/components/Sidebar';
import {Login} from './pages/login_register/Login';
import {Register} from './pages/login_register/Register';
import {Home} from './pages/app/Home';
import {PantryPage} from './pages/app/PantryPage';
import {AdvancedPage} from './pages/app/AdvancedPage';


function App() {

  const [loginRegisterForm, setLoginRegisterForm] = useState('loginPage')
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a valid JWT exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // You may want to verify the token on the server-side as well for added security
      setLoggedIn(true);
    }
  }, []);

  const toggleForm = (formName) => {
    setLoginRegisterForm(formName);
  }

  const handleLogin = async (emailuser, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        emailuser,
        password,
      });
      // Check the status code and handle the response data accordingly
      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem('token', response.data.token);
        // Set the loggedIn state to true
        setLoggedIn(true);
      } else {
        console.log("Login failed:", response.data.error);
        // Handle unsuccessful login, e.g., display an error message to the user
      }
    } catch (error) {
      // Handle API call errors
      console.log(error);
    }
  };

  const handleRegister = async (email, username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        username,
        password,
      });

    } catch (error) {
      // Handle API call errors
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Clear the JWT from local storage
    localStorage.removeItem('token');
    // Set the loggedIn state to false
    setLoggedIn(false);
  };
  
  if (loggedIn) {
    return (
      <div className="page">
        <div className="sidebar">
        <Sidebar onLogout={handleLogout}/>
        </div>
        <div className="workspace">
        <Routes>
          <Route path="/" element={<Navigate to="/shopping" />}/>
          <Route path="/shopping" element={<Home />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/advanced" element={<AdvancedPage />} />
        </Routes>
        </div>
      </div>

    );
  }

  return (
    <div className="App">
      {
        loginRegisterForm === 'loginPage'? <Login onFormChange={toggleForm} onLogin={handleLogin}/> : <Register onFormChange={toggleForm} onRegister={handleRegister} />
      }
    </div>
  );
}

export default App;
