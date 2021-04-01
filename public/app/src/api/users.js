import { baseUrl } from './config';

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
    console.log(error);
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

export const updateUserProfile = async (name, email) => {
  try {
    const res = await baseUrl.patch('/users/me', { name, email });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserPassword = async (current_password, new_password) => {
  try {
    const res = await baseUrl.patch('/users/change_password', {
      current_password,
      new_password,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async (password) => {
  try {
    const res = await baseUrl.delete('/users/me', {
      data: { password },
    });

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
