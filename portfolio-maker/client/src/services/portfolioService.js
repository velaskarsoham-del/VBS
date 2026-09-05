import API from './api';

export const getPortfolio = async () => {
  const response = await API.get('/portfolio');
  return response.data;
};

export const updatePortfolio = async (portfolioData) => {
  const response = await API.put('/portfolio', portfolioData);
  return response.data;
};

export const uploadAvatar = async (formData) => {
  const response = await API.post('/portfolio/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const togglePublish = async (published) => {
  const response = await API.put('/portfolio/publish', { published });
  return response.data;
};

export const getPublicPortfolio = async (username) => {
  const response = await API.get(`/portfolio/public/${username}`);
  return response.data;
};
