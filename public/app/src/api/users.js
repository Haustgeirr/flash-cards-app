import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: '/api/v1',
});

export const login = async (username, password, remember_me) => {
  console.log('users.userLogin');
  const response = await baseUrl.post('/users/login', {
    username,
    password,
    remember_me,
  });

  return { id: response.data._id, name: response.data.name };
};

export const getCurrentUser = async () => {
  const response = await baseUrl.get('/users/current_user');
  return response.data.user;
};
