import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For disabling button during login
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
  
      // Validate response structure
      if (!response.data || !response.data.accessToken || !response.data.user) {
        throw new Error('Unexpected response structure from server');
      }
  
      const { accessToken, user } = response.data;
  
      // Store token in localStorage
      localStorage.setItem('token', accessToken);
  
      // Redirect user based on role
      if (user.role === 'student') {
        router.push('/dashboard/student');
      } else if (user.role === 'employer') {
        router.push('/dashboard/employer');
      } else {
        alert('Unknown user role');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data?.message || 'Invalid credentials');
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Something went wrong. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Stop loading
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginPage;
