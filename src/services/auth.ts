import api from './api';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const { data } = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
