// pages/dashboard/student.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { AuthenticatedNavbar } from '../../components/AuthenticatedNavbar';

interface Internship {
  id: number;
  title: string;
  description: string;
  location: string;
  deadline: string;
}

const StudentDashboard = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [appliedInternships, setAppliedInternships] = useState<Internship[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/internship', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInternships(data));
  }, []);

  const applyToInternship = () => {
    if (!selectedInternship || !resume) {
      alert('Please upload a resume before applying.');
      return;
    }

    const formData = new FormData();
    formData.append('internshipId', selectedInternship.id.toString());
    formData.append('resume', resume);
    if (coverLetter) formData.append('coverLetter', coverLetter);

    fetch('http://localhost:3000/application/apply', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then(() => {
        alert('Application successful!');
        setAppliedInternships((prev) => [...prev, selectedInternship]);
        setOpenModal(false);
        setResume(null);
        setCoverLetter('');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to apply. Please try again.');
      });
  };

  return (
    <div>
      <AuthenticatedNavbar />
      <Box p={3}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Student Dashboard
        </Typography>

        {/* Internships Listing */}
        <Grid container spacing={3}>
          {internships.map((internship) => (
            <Grid item xs={12} md={6} lg={4} key={internship.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{internship.title}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {internship.location}
                  </Typography>
                  <Typography variant="body1">{internship.description}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Deadline: {new Date(internship.deadline).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedInternship(internship);
                      setOpenModal(true);
                    }}
                    style={{ marginTop: '1rem' }}
                    disabled={appliedInternships.some((applied) => applied.id === internship.id)}
                  >
                    {appliedInternships.some((applied) => applied.id === internship.id) ? 'Applied' : 'Apply'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Application Tracking */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Applications Submitted
          </Typography>
          {appliedInternships.length > 0 ? (
            <ul>
              {appliedInternships.map((internship) => (
                <li key={internship.id}>{internship.title}</li>
              ))}
            </ul>
          ) : (
            <Typography>No applications submitted yet.</Typography>
          )}
        </Box>

        {/* Application Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Resume and Cover Letter
            </Typography>
            <TextField
              fullWidth
              type="file"
              inputProps={{ accept: '.pdf,.doc,.docx' }}
              onChange={(e) => setResume((e.target as HTMLInputElement).files?.[0] || null)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              fullWidth
              label="Cover Letter (Optional)"
              multiline
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={applyToInternship}
            >
              Submit Application
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default StudentDashboard;