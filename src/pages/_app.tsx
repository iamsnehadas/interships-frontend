import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navbar } from '@/components/Navbar';
import InternshipSection from '@/components/Internships/InternsipSection'
import JobSection from '@/components/Jobs/JobSection'

// Create a custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f9f9f9', // Soft gray background
    },
    text: {
      primary: '#333', // Dark text for readability
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`, // Use Roboto as the default font
  },
});

// Create a Query Client for react-query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <CssBaseline />
        <InternshipSection />
        <JobSection />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
