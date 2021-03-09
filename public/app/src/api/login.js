import axios from 'axios';

const login = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export default login;
