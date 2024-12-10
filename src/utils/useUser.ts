import { jwtDecode } from 'jwt-decode';

export const useUser = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) return null;

  const decoded: { sub: number; email: string; role: string } = jwtDecode(token);
  return decoded;
};
