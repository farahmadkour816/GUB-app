import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import FormPage from './FormPage';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1A202C, #319795)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" color="#CBD5E0" mb={4}>
          York University
        </Typography>
        <Typography variant="h4" color="#CBD5E0" mb={4}>
          Smart Grid Labs
        </Typography>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Optimal Planning & Management of{' '}
          <Box component="span" sx={{ color: '#81E6D9' }}>
            Energy Facilities
          </Box>
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/form')}
          sx={{
            backgroundColor: '#38B2AC',
            '&:hover': {
              backgroundColor: '#319795',
            },
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Let's Get Started
        </Button>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/form" element={<FormPage />} /> {/* ✅ FIXED LINE */}
    </Routes>
  );
}
