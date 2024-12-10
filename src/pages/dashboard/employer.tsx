// pages/dashboard/employer.tsx
import { useState, useEffect } from 'react';
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar';

const EmployerDashboard = () => {
  interface Internship {
    id: number;
    title: string;
    description: string;
    company: string;
    location: string;
    deadline: string;
  }

  const [internships, setInternships] = useState<Internship[]>([]);
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    deadline: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/internship', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInternships(data));
  }, []);

  const createInternship = () => {
    fetch('http://localhost:3000/internship/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newInternship),
    }).then(() => {
      alert('Internship created!');
      setNewInternship({ title: '', description: '', company: '', location: '', deadline: '' });
    });
  };

  const viewApplications = (id: number) => {
    fetch(`http://localhost:3000/internship/applications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data)); // Replace with better UI
  };

  return (
    <div>
    <AuthenticatedNavbar />
      <h1>Employer Dashboard</h1>
      <div>
        <h2>Create New Internship</h2>
        <input
          type="text"
          placeholder="Title"
          value={newInternship.title}
          onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newInternship.description}
          onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company"
          value={newInternship.company}
          onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newInternship.location}
          onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
        />
        <input
          type="date"
          value={newInternship.deadline}
          onChange={(e) => setNewInternship({ ...newInternship, deadline: e.target.value })}
        />
        <button onClick={createInternship}>Post</button>
      </div>
      <div>
        <h2>My Internships</h2>
        <ul>
          {internships.map((internship) => (
            <li key={internship.id}>
              <h3>{internship.title}</h3>
              <button onClick={() => viewApplications(internship.id)}>View Applications</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployerDashboard;
