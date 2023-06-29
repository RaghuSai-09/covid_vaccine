import { useState, useEffect } from 'react';
import * as api from '../api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); 
  const navigate = useNavigate();
  const [dosageDetails, setDosageDetails] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    workingHours: '',
    dosage: '',
  });
  

  const [bookedSlots, setBookedSlots] = useState([]);

  const fetchBookedSlots = async () => {
    try {
      const response = await api.getBookedSlots();
      setBookedSlots(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVaccinationCenters = async () => {
    try {
      const response = await api.getVaccinationCenters();
      setVaccinationCenters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async() => {
    try{
      await api.logout();
      localStorage.clear('admin');
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };


  useEffect(() => {
    fetchVaccinationCenters();
    fetchBookedSlots();
  }, []);

  const handleAddCenter = async () => {
    setShowAddForm(true);
  };

  const handleRemoveCenter = async (centerId) => {
    try {
      await api.remove(centerId);
      fetchVaccinationCenters();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewCenter((prevCenter) => ({ ...prevCenter, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newCenter);
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin')}`,
        },
      };
      const response = await api.addCenter(newCenter,config);
      console.log(response);
      setNewCenter({
        name: '',
        address: '',
        workingHours: '',
        dosage: '',
      });
      setShowAddForm(false);
      fetchVaccinationCenters();
      window.location.replace('/admindashboard');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-row items-center justify-evenly min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h2>
      {showAddForm ? (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCenter.name}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={newCenter.address}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dosageDetails" className="block text-gray-700 font-bold mb-2">
                Dosage Details:
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={newCenter.dosage}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="workingHours" className="block text-gray-700 font-bold mb-2">
                Working Hours:
              </label>
		 <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={newCenter.workingHours}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div className="flex justify-center ">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 mx-3 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Submit
              </button>
              <button  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out" onClick={()=>{setShowAddForm(false)}}> 
              Go to Dashboard 
              </button>
            </div>
          </form>
        ) : (
          <>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Vaccination Centers</h3>
          {vaccinationCenters.length > 0 ? (
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Working Hours</th>
                  
                  {dosageDetails ? (
                    <th className="py-2 px-4 border-b">Dosage Details</th>
                  ) : null}
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationCenters.map((center) => (
                  <tr key={center._id}>
                    <td className="py-2 px-4 border-b">{center.name}</td>
                    <td className="py-2 px-4 border-b">{center.address}</td>
                    <td className="py-2 px-4 border-b">{center.workingHours}</td>
                    {dosageDetails ? (
                      <td className="py-2 px-4 border-b">{center.dosage}</td>
                    ) : null}
                    <td className="py-2 px-4 border-b">
                      
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                          onClick={() => handleRemoveCenter(center._id)}>
                          Remove
                        </button>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No vaccination centers found.</p>
          )}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
          onClick={handleAddCenter}
        >
          Add Vaccine Center
        </button>
        
        { dosageDetails ? (
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
          onClick={() => setDosageDetails(false)}
        >
          Hide Dosage Details
        </button> ) : <button
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
        onClick={() => setDosageDetails(!dosageDetails)}
      >
        Get Dosage Details
      </button>
        }
        <button
          className="bg-red-500 text-white py-2 px-4 m-36 rounded hover:bg-red-600 transition duration-300 ease-in-out mt-6"
          onClick={handleLogout}>
          Logout
        </button>
        </>
        )}
      </div>

      <div className='w-full max-w-3xl p-6 bg-white rounded-lg shadow-md'>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Booked Slots</h2>
        {bookedSlots.length > 0 ? (
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Center_Address</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
              </thead>
              <tbody>
                {bookedSlots.map((slot) => (
                  <tr key={slot._id}>
                    <td className="py-2 px-4 border-b">{slot.name}</td>
                    <td className="py-2 px-4 border-b">{slot.email}</td>
                    <td className="py-2 px-4 border-b">{slot.center_address}</td>
                    <td className="py-2 px-4 border-b">{slot.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p className="text-center text-gray-500">No booked slots found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
