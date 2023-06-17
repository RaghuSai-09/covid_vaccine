/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserDashboard from './pages/UserDashboard';
import SlotBooking from './components/SlotBooking';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/Admin';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/slot-booking" element={<SlotBooking/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;

