import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3000/auth/register', formData);
      alert('Signup successful! Please log in.');
      router.push('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Select
        fullWidth
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        sx={{ mt: 2 }}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="employer">Employer</MenuItem>
      </Select>
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
