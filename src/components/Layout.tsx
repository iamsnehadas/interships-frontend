import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container style={{ marginTop: '2rem' }}>{children}</Container>
    </>
  );
};
