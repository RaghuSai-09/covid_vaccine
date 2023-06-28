import React,{useEffect} from 'react';
import decode from 'jwt-decode';
import { Link} from 'react-router-dom';
import logo from '../files/logo.png'
import mt from '../files/mt.png';
const Navbar = () => {

  const user = localStorage.getItem('Profile');
  const admin =  localStorage.getItem('admin');

  useEffect(()=>{
    const token=user?.token
    if(token){
      const decodedToken=decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        handleLogout()
      }
    }
  }) 

  const handleLogout = async() => {
    try{
      
        localStorage.clear('Profile');
      
      localStorage.clear('admin');
      window.location.replace('/');
    }catch(error){
      console.error(error);
    }
  };
  
  return (
    <nav className="flex items-center justify-between bg-green-900 p-4">
      <div className='flex items-center'>
        <img className="w-14" src={logo} alt='logo'/>
        <Link to="/" className="text-white text-2xl font-bold">COVID Vaccination Booking</Link>
      </div>
      <div className='justify-between'>
      {user == null && admin == null ?
        <>
        <Link to="/" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Home</Link>
        <Link to="/login" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Login</Link>
        <Link to="/signup" className="text-white px-4 py-2 rounded-full hover:bg-white hover:text-blue-500">Signup</Link> 
        <Link to="/admin" className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500">Admin Login</Link>
        </> :
        <>
        <div className="flex flex-row">
        <img alt="profile" src={mt} className="w-10 h-10 mr-3 rounded justify-center duration-500 hover:scale-125 cursor-pointer"/>
        <button onClick={handleLogout} className="text-white px-4 py-2 mr-4 rounded-full hover:bg-white hover:text-blue-500" > Logout </button>
        </div>
        </>
        }
        
      </div>
    </nav>
  );
}

export default Navbar