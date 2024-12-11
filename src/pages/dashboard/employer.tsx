// Updated Employer Dashboard (employer.tsx)
import React, { useState, useEffect } from 'react';
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Internship {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  deadline: string;
  applicationsCount?: number; // Allow for undefined
}

interface Application {
  id: number;
  user: {
    name: string;
    email: string;
  };
  resume: string;
  coverLetter: string | null;
}

const EmployerDashboard = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [newInternship, setNewInternship] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    deadline: '',
  });

  const fetchInternships = () => {
    fetch('http://localhost:3000/internship', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInternships(data));
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const createInternship = () => {
    const internshipData = {
      ...newInternship,
      deadline: `${newInternship.deadline}T00:00:00.000Z`, // Add time to match ISO-8601 format
    };

    fetch('http://localhost:3000/internship/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(internshipData),
    }).then(() => {
      alert('Internship created!');
      setNewInternship({ title: '', description: '', company: '', location: '', deadline: '' });
      fetchInternships(); // Refresh the list
    });
  };

  const viewApplications = (id: number) => {
    fetch(`http://localhost:3000/application/internship/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setApplications(data)); // Store applications data
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Employer Dashboard
        </Typography>

        {/* Internship Posting Form */}
        <Card style={{ marginBottom: '2rem' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Create New Internship
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Title"
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={newInternship.location}
                  onChange={(e) => setNewInternship({ ...newInternship, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Deadline"
                  InputLabelProps={{ shrink: true }}
                  value={newInternship.deadline}
                  onChange={(e) => setNewInternship({ ...newInternship, deadline: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={newInternship.description}
                  onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={createInternship}>
                  Post Internship
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* My Internships Table */}
        <Typography variant="h6" gutterBottom>
          My Internships
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {internships.map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell>{internship.title}</TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>{internship.location}</TableCell>
                  <TableCell>{new Date(internship.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {internship.applicationsCount ? internship.applicationsCount : 'No Applications'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => viewApplications(internship.id)}
                    >
                      View Applications
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Applications List */}
        {applications.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6">Applications</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Applicant Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Resume</TableCell>
                    <TableCell>Cover Letter</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.user.name}</TableCell>
                      <TableCell>{app.user.email}</TableCell>
                      <TableCell>
                        <a href={app.resume} target="_blank" rel="noopener noreferrer">
                          View Resume
                        </a>
                      </TableCell>
                      <TableCell>{app.coverLetter || 'No Cover Letter'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default EmployerDashboard;
