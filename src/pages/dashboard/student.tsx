// pages/dashboard/student.tsx
import { useEffect, useState } from 'react';
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar';

const StudentDashboard = () => {
  interface Internship {
    id: number;
    title: string;
    description: string;
  }

  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/internship', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInternships(data));
  }, []);

  const applyToInternship = (id: number) => {
    fetch(`http://localhost:3000/application/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ internshipId: id }),
    }).then(() => alert('Application successful!'));
  };

  return (
    <div>
    <AuthenticatedNavbar />
      <h1>Student Dashboard</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship.id}>
            <h2>{internship.title}</h2>
            <p>{internship.description}</p>
            <button onClick={() => applyToInternship(internship.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
