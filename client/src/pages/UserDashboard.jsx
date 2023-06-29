import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserDashboard = () => {
  const [bookingMessage, setBookingMessage] = useState('');
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [centerAddress, setCenterAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [date, setDate] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vaccination centers
    const fetchVaccinationCenters = async () => {
      try {
        const response = await api.getVaccinationCenters();
        console.log(response);
        setVaccinationCenters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVaccinationCenters();
  }, []);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSearch = () => {
    const filtered = vaccinationCenters.filter(
      (center) =>
        center.workingHours.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered);
    setFilteredCenters(filtered);
  };

  const handleBookSlot = async (data) => {
    try {
      const response = await api.bookSlot(data);
      setBookingMessage(response.data.message);
      window.alert(response.data.message);
      navigate('/userdadhboard');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedDate = date ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : '';
    const formData = {
      name : userName,
      email : userEmail,
      center : selectedCenter,
      address: centerAddress,
      date: formattedDate,
    }
    handleBookSlot(formData);
  };

  const handleCenterSelect = (event) => {
    const centerId = event.target.value;
    const selectedCenter = vaccinationCenters.find((center) => center._id === centerId);
    if (selectedCenter) {
      setSelectedCenter(selectedCenter.name);
      setCenterAddress(selectedCenter.address || " ");
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      localStorage.clear('Profile');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-evenly min-h-screen bg-gray-200">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Vaccination Centers</h2>
          {bookingMessage && <p className="text-green-500 mt-2">{bookingMessage}</p>}
          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Search by name or working hours"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Address</th>
                <th className="py-3 px-4 border-b">Working Hours</th>
                <th className="py-3 px-4 border-b">Dosage Details</th>
              </tr>
            </thead>
            <tbody>
              {searchQuery
                ? filteredCenters.map((center) => (
                    <tr key={center._id}>
                      <td className="py-3 px-4 border-b">{center.name}</td>
                      <td className="py-3 px-4 border-b">{center.address}</td>
                      <td className="py-3 px-4 border-b">{center.workingHours}</td>
                      <td className="py-3 px-4 border-b">{center.dosage}</td>
                      
                    </tr>
                  ))
                : vaccinationCenters.map((center) => (
                    <tr key={center._id}>
                      <td className="py-3 px-4 border-b">{center.name}</td>
                      <td className="py-3 px-4 border-b">{center.address}</td>
                      <td className="py-3 px-4 border-b">{center.workingHours}</td>
                      <td className="py-3 px-4 border-b">{center.dosage}</td>
                      
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Dashboard</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">COVID-19 Information</h3>
              <p>Total Cases: 11231223</p>
              <p>Total Deaths: 11000000</p>
              <p>Total Recovered: 7000000</p>
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 justify-center rounded hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Book the Slot</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="center" className="block text-gray-700 font-semibold mb-2">
                Vaccination Center
              </label>
              <select
                id="center"
                value={selectedCenter.name}
                onChange={handleCenterSelect}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select a center</option>
                {vaccinationCenters.map((center) => (
                  <option key={center._id} value={center._id}>
                    {center.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <input id="center"  value={centerAddress} onChange={(e) => handleCenterSelect(e.target.value)} 
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" required readOnly>
              </input>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label>
              <DatePicker className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" id="date" 
              dateFormat="dd/MM/yyyy"
              selected={date} onChange={handleDateChange} />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Book Slot
            </button>
          </form>
          </div>
      </div>
    </>
  );
};

export default UserDashboard;
