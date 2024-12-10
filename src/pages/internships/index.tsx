import React from 'react';
import { LatestInternships } from '@/components/LatestInternships';
import { LatestJobs } from '@/components/LatestJobs';

const HomePage = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <LatestInternships />
      <LatestJobs />
    </div>
  );
};

export default HomePage;
