import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';

export default function CreateInternship() {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'ADMIN') {
      router.push('/');
    }
  }, []);

  return (
    <Layout>
      <h1>Create Internship (Admins Only)</h1>
      {/* Internship creation form goes here */}
    </Layout>
  );
}
