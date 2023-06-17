import React, { useState } from 'react';
import UserDashboard from '../pages/UserDashboard';
import Login from './Login';

const logout = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set the initial login state

  const handleLogout = () => {
    // Perform any necessary logout logic, such as clearing session/local storage, etc.
    setIsLoggedIn(false); // Update the login state to false
  };

  return (
    <Login/>
  );
};

export default logout;
