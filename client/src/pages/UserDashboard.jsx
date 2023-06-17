import { useState, useEffect} from 'react';
import * as api from "../api.js";

const UserDashboard = ({ handleLogout }) => {
  
  // const [bookingSlot, setBookingSlot] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [vaccinationCenters, setvaccinationCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCenters, setFilteredCenters] = useState([]);

  const handleBookSlot = async () => {
    try {
      const response = await api.bookSlot({  });
      setBookingMessage(response.data.message);
      // Perform any additional logic based on the booking response
    } catch (error) {
      console.error(error);
    }

  };
  useEffect(() => {
    // Fetch vaccination centers
    const fetchVaccinationCenters = async () => {
      try {
        const response = await api.getVaccinationCenters();
        console.log(response);
        setvaccinationCenters(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVaccinationCenters();
  }, []);

  const handleSearch = () => {
    const filtered = vaccinationCenters.filter(
      (center) =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.workingHours.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCenters(filtered);
  };

  
  return (
    <>
    
    <div className="flex  items-center justify-evenly min-h-screen bg-gray-100">
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Vaccination Centers</h2>

      {bookingMessage && <p className="text-green-500 mt-2">{bookingMessage}</p>}

       {/* Search Bar */}
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

      {/* Vaccination Centers */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Working Hours</th>
            <th className='py-3 px-4 border-b'>Available slots</th>
            <th className="py-3 px-4 border-b">
            Book Slot
            </th>
          </tr>
        </thead>
        <tbody>
          {vaccinationCenters.map((center) => (
            <tr key={center._id}>
              <td className="py-3 px-4 border-b">{center.name}</td>
              <td className="py-3 px-4 border-b">{center.address}</td>
              <td className="py-3 px-4 border-b">{center.workingHours}</td>
              <td className="py-3 px-4 border-b">{center.availableSlots}</td>
              <td className="py-3 px-4 border-b">
              <button
              className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={handleBookSlot}>
              Book 
              </button>
              </td>
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
        {/* Display other COVID-19 information */}
      </div>
      
        
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </div>

    
    

</>
    
  );
};

export default UserDashboard;
