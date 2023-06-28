import React,{ useState } from 'react';
import * as api from '../api.js';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [email,setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login({ email, password });
      const token = response.data;
      localStorage.setItem('Profile',token);
      console.log(response.status);
      if (response.status === 200) {
        setError('');

        navigate('/userdashboard');
      }else if(response.status === 201){
        window.alert(response.data.message);
        navigate('/admin');
      }else{
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      window.alert(error);
      setError('Failed to login');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-indigo-600">
      <div className="bg-white p-8 rounded shadow-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-xs italic mb-2">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => setemail(e.target.value)} required/>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
