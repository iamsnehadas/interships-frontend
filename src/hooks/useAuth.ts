import { useState, useEffect } from 'react';
import { getUser } from '@/services/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
