import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { accessToken, user } = response.data; // Assuming the backend returns this structure

      // Save the token for authentication (if required later)
      localStorage.setItem('token', accessToken);

      // Redirect based on role
      if (user.role === 'student') {
        router.push('/dashboard/student');
      } else if (user.role === 'employer') {
        router.push('/dashboard/employer');
      } else {
        alert('Unknown role');
      }
    } catch (error) {
      alert('Invalid Credentials');
      console.error(error);
    }
  };

  return (
    <Box style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h4" style={{ marginBottom: '1rem' }}>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        style={{ marginBottom: '1rem' }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: '1rem' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
