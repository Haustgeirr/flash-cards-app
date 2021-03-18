import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: '/api/v1',
});

export const signup = async (name, email, password) => {
  try {
    const res = await baseUrl.post('/users/signup', {
      name,
      email,
      password,
    });

    return res;
  } catch (error) {
    return error.response.data;
  }
};

export const signin = async (email, password, remember_me) => {
  try {
    const res = await baseUrl.post('/users/signin', {
      email,
      password,
      remember_me,
    });

    return res.data;
  } catch (error) {
    return { error: 'These credentials do not match our records' };
  }
};

export const signout = async () => {
  const res = await baseUrl.post('/users/signout', {});
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await baseUrl.get('/users/current_user');
  return res.data.user;
};

export const updateUserProfile = async ({ name, email }) => {
  try {
    const res = await baseUrl.patch('/users/me', { name, email });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
