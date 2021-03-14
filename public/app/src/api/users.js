import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: '/api/v1',
});

export const signup = async (name, username, password) => {
  const res = await baseUrl.post('/users/signup', {
    name,
    username,
    password,
  });

  return res.data;
};

export const login = async (username, password, remember_me) => {
  try {
    const res = await baseUrl.post('/users/login', {
      username,
      password,
      remember_me,
    });

    return res.data;
  } catch (error) {
    return { error: 'These credentials do not match our records' };
  }
};

export const getCurrentUser = async () => {
  const res = await baseUrl.get('/users/current_user');
  return res.data.user;
};

export const logout = async () => {
  const res = await baseUrl.post('/users/logout', {});
  return res.data;
};
