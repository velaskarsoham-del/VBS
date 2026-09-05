import API from './api';

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('portfolio_token', response.data.token);
  }
  return response.data;
};

export const login = async (userData) => {
  const response = await API.post('/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('portfolio_token', response.data.token);
  }
  return response.data;
};

export const getMe = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('portfolio_token');
};
