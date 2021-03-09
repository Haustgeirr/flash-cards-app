import axios from 'axios';

export const login = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const getUser = async () => {
  const response = await login.get('/users/current-user');
};

export const getUserLoginStatus = async () => {};
