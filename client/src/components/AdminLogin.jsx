import { useState } from 'react';
// import axios from 'axios';
import * as api from '../api.js';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.adminlog({ email, password });
      const token = response.data;
      localStorage.setItem('admin',token);
      if (response.status === 200) {
        // Admin login successful
        setError('');
        window.alert('Admin login successful');
        
        navigate('/admindashboard');

      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      // navigate('/admindashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md transform transition-all duration-500 hover:scale-110">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        <Transition
          show={error !== ''}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="text-red-500 text-center mb-4">{error}</p>
        </Transition>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
              email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="email" required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 font-semibold mb-2 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Password" required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white items-center"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
