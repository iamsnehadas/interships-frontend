import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Dashboard = () => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Dashboard;
