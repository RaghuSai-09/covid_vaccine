import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../files/logo.png'
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-green-900 p-4">
      <div className='flex items-center'>
        <img className="w-14" src={logo} alt='logo'/>
        <Link to="/" className="text-white text-2xl font-bold">COVID Vaccination Booking</Link>
      </div>
      <div className='justify-between'>
        <Link to="/" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Home</Link>
        <Link to="/login" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Login</Link>
        <Link to="/signup" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-500">Signup</Link>
        <Link to="/admin" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Admin Login</Link>
      </div>
    </nav>
  );
}

export default Navbar