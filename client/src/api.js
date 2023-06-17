import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update with your backend URL
});

export const getVaccinationCenters = () => {
  return instance.get('/users/vaccinationcenters');
};

export const vaccinationCenterSeacrh = () => {
  return instance.get('/users/vaccinationcenters/seacrh');
};
export const adminlog = (data) => {
  return instance.post('/admin/login',data);
};

export const bookSlot = (data) => {
  return instance.post('/slotbooking',data);
};

export const covid = (data) => {
  return instance.get('/covid-info',data);
};

export const dosage = () => {
  return instance.get('/admindashboard',);
};
export const login= (data) => {
  return instance.post('/users/login',data);
};
export const signup = (data) => {
  return instance.post('/users/signup',data);
};

export const remove = (data) => {
  return instance.post('/admindashboard',data);
};

// Add additional API functions as needed
