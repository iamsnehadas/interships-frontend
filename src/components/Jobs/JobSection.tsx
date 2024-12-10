import React from 'react';
import styles from './JobSection.module.css';
import JobCard from './JobCard';

interface Job {
  id: number;
  company: string;
  role: string;
  location: string;
  stipend: string;
}

const Jobs: Job[] = [
  { id: 1, company: 'Google', role: 'Software Engineer', location: 'Remote', stipend: '$6000/month' },
  { id: 2, company: 'Microsoft', role: 'Data Analyst', location: 'Seattle, WA', stipend: '$5500/month' },
  { id: 3, company: 'Tesla', role: 'Junior Designer', location: 'Fremont, CA', stipend: '$4700/month' },
  { id: 4, company: 'Amazon', role: 'Cloud Architect', location: 'Remote', stipend: '$5200/month' },
  { id: 5, company: 'Google', role: 'Software Engineer', location: 'Remote', stipend: '$5000/month' },
  { id: 6, company: 'Microsoft', role: 'Data Analyst', location: 'Seattle, WA', stipend: '$3800/month' },
  { id: 7, company: 'Tesla', role: 'Design', location: 'Fremont, CA', stipend: '$4500/month' },
  { id: 8, company: 'Amazon', role: 'Cloud Architect', location: 'Remote', stipend: '$4200/month' },
];

const JobSection = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Latest Jobs on Internshala</h2>
      <div className={styles.scrollContainer}>
        {Jobs.map((Job) => (
          <JobCard key={Job.id} {...Job} />
        ))}
      </div>
    </div>
  );
};

export default JobSection;
