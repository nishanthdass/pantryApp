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
import { RecipesProvider } from './pages/components/RecipeContext';
import { PopupProvider } from "./pages/components/PopupContext";


function App() {
  const [loginRegisterForm, setLoginRegisterForm] = useState('loginPage')
  const [loggedIn, setLoggedIn] = useState(false);

  // find user token from browser on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // sets state for login/register sequence
  const toggleForm = (formName) => {
    setLoginRegisterForm(formName);
  }

  const handleLogin = async (emailuser, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        emailuser,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
      } 
      else {
        console.log("Login failed:", response.data.error);
      }
    } 
    catch (error) {
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
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  
  if (loggedIn) {
    return (
      <div className="page">
        <div className="sidebar">
        <Sidebar onLogout={handleLogout}/>
        </div>
        <div className="workspace">
        <RecipesProvider>
          <PopupProvider>
              <Routes>
                  <Route path="/" element={<Navigate to="/shopping" />}/>
                  <Route path="/shopping" element={<Home />} />
                  <Route path="/pantry" element={<PantryPage />} />
                  <Route path="/advanced" element={<AdvancedPage />} />
              </Routes>
          </PopupProvider>
        </RecipesProvider>
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
