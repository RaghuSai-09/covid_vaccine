import { useState, useEffect } from 'react';
import * as api from '../api';

const AdminDashboard = ({ handleLogout }) => {
  const [vaccinationCenters, setVaccinationCenters] = useState([]);
  const [dosageDetails, setDosageDetails] = useState([]);

  const fetchVaccinationCenters = async () => {
    try {
      const response = await api.getVaccinationCenters();
      setVaccinationCenters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDosageDetails = async () => {
    try {
      const response = await api.dosage();
      setDosageDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVaccinationCenters();
    fetchDosageDetails();
  }, []);

  const handleAddCenter = async () => {
    // Implement logic to add a vaccination center
  };

  const handleRemoveCenter = async (centerId) => {
    try {
      await api.remove(centerId);
      fetchVaccinationCenters();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Vaccination Centers</h3>
          {/* Vaccination Centers Table */}
          {vaccinationCenters.length > 0 ? (
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Working Hours</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationCenters.map((center) => (
                  <tr key={center._id}>
                    <td className="py-2 px-4 border-b">{center.name}</td>
                    <td className="py-2 px-4 border-b">{center.address}</td>
                    <td className="py-2 px-4 border-b">{center.workingHours}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={() => handleRemoveCenter(center._id)}
                      >
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
        {/* Add Vaccine Center Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
          onClick={handleAddCenter}
        >
          Add Vaccine Center
        </button>
        {/* Delete Vaccine Centers Button */}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out mr-2"
          onClick={handleRemoveCenter}
        >
          Delete Vaccine Centers
        </button>
        {/* Get Dosage Details Button */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
          onClick={fetchDosageDetails}
        >
          Get Dosage Details
        </button>
        {/* Display Dosage Details */}
        {dosageDetails.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Dosage Details</h3>
            {/* Display dosage details */}
          </div>
        )}
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out mt-6"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
