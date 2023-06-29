import React, {useState}from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import * as api from '../api.js';
const Signup = () => {
  const [name,setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API
      const response = await api.signup({ name, email, password });
      console.log(response);
      if (response.status === 201) {
        setError('');
        setSignupSuccess(true);
        navigate('/login');
      } else {
        setError('Failed to register 1');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to register ');
    }
  };

  if(signupSuccess) {
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>
        {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" value={name} onChange={(e)=> setName(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => setemail(e.target.value)} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" id="phone" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition-colors duration-300">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
