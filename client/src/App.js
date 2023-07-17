import React, { useState } from "react"
import './App.css';
import {Route, Link, Routes} from 'react-router-dom';
import Sidebar from './pages/components/Sidebar';
import {Login} from './pages/login_register/Login';
import {Register} from './pages/login_register/Register';
import {Home} from './pages/app/Home';
import {PantryPage} from './pages/app/PantryPage';
import {AdvancedPage} from './pages/app/AdvancedPage';


function App() {

  const [loginRegisterForm, setLoginRegisterForm] = useState('loginPage')
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setLoginRegisterForm(formName);
  }

  const handleLogin = async (emailuser, password) => {
    try {
      if (emailuser === 'nish') {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
    }
  };

  /*const handleLogin = async (emailuser, password) => {
    try {
      // Call your login API function with the provided credentials
      const response = await apiLogin(credentials);
      // Assuming the server responds with a success status
      if (response.status === 'success') {
        setLoggedIn(true); // Update the logged-in state
      } else {
        // Handle unsuccessful login, e.g., display an error message
      }
    } catch (error) {
      // Handle API call errors
    }
  };
  */
  
  if (loggedIn) {
    return (
      
      <div className="page">
        <Sidebar/>
        <Routes>
          <Route path="/shopping" element={<Home />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/advanced" element={<AdvancedPage />} />
        </Routes>
      </div>

    );
  }

  return (
    <div className="App">
      {
        loginRegisterForm === 'loginPage'? <Login onFormChange={toggleForm} onLogin={handleLogin}/> : <Register onFormChange={toggleForm} />
      }
    </div>
  );
}

export default App;
