import React from 'react';
import { Container, Typography } from '@mui/material';

const TestingPage: React.FC = () => {
  return (
    <Container sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h4">Welcome to the Testing Page</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Use the navigation to explore the application.
      </Typography>
    </Container>
  );
};

export default TestingPage;
