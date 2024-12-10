import React from 'react';
import styles from './InternshipSection.module.css';
import InternshipCard from './InternshipCard';

interface Internship {
  id: number;
  company: string;
  role: string;
  location: string;
  stipend: string;
}

const internships: Internship[] = [
  { id: 1, company: 'Google', role: 'Software Engineer Intern', location: 'Remote', stipend: '$2000/month' },
  { id: 2, company: 'Microsoft', role: 'Data Analyst Intern', location: 'Seattle, WA', stipend: '$1800/month' },
  { id: 3, company: 'Tesla', role: 'Design Intern', location: 'Fremont, CA', stipend: '$2500/month' },
  { id: 4, company: 'Amazon', role: 'Cloud Architect Intern', location: 'Remote', stipend: '$2200/month' },
  { id: 5, company: 'Google', role: 'Software Engineer Intern', location: 'Remote', stipend: '$2000/month' },
  { id: 6, company: 'Microsoft', role: 'Data Analyst Intern', location: 'Seattle, WA', stipend: '$1800/month' },
  { id: 7, company: 'Tesla', role: 'Design Intern', location: 'Fremont, CA', stipend: '$2500/month' },
  { id: 8, company: 'Amazon', role: 'Cloud Architect Intern', location: 'Remote', stipend: '$2200/month' },
];

const InternshipSection = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Latest Internships on Internshala</h2>
      <div className={styles.scrollContainer}>
        {internships.map((internship) => (
          <InternshipCard key={internship.id} {...internship} />
        ))}
      </div>
    </div>
  );
};

export default InternshipSection;
