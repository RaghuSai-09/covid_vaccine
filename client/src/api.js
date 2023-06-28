import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('admin');
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Update with your backend URL
});

export const getVaccinationCenters = () => {
  return instance.get('/users/vaccinationcenters');
};
export const getBookedSlots = () => {
  return instance.get('/admin/bookedslots');
};
export const vaccinationCenterSeacrh = () => {
  return instance.get('/users/vaccinationcenters/seacrh');
};
export const adminlog = (data) => {
  return instance.post('/admin/login',data);
};

export const bookSlot = (data) => {
  return instance.post('/users/slot-booking',data);
};

export const login= (data) => {
  return instance.post('/users/login',data);
};
export const signup = (data) => {
  return instance.post('/users/signup',data);
};

export const remove = (data) => {
  return instance.delete(`/admin/vaccinationcenters/${data}`);
};

export const addCenter = async (data,config) => {
  return instance.post('/admin/vaccinationcenters/add',data,config);
};

export const logout = (data) => {
  return instance.post('/users/logout',data);
};