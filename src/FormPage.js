

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';

import PersonalInfoAccordion from './components/accordions/PersonalInfoAccordion';
import FacilityInfoAccordion from './components/accordions/FacilityInfoAccordion';
import CogenerationAccordion from './components/accordions/CogenerationAccordion';
import PVAccordion from './components/accordions/PVAccordion';
import HydrogenAccordion from './components/accordions/HydrogenAccordion';
import DemandResponseAccordion from './components/accordions/DemandResponseAccordion';
import AdvancedSettingsAccordion from './components/accordions/AdvancedSettingsAccordion';
import SystemInfoAccordion from './components/accordions/SystemInfoAccordion';

export default function FormPage() {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formValues);
    alert('Form data logged to console.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1A202C, #319795)',
        color: '#CBD5E0',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
          System Design Form
        </Typography>

        <Divider sx={{ my: 4, borderColor: '#81E6D9' }} />

        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            p: 3,
            boxShadow: 4,
            color: 'black',
          }}
        >
          <PersonalInfoAccordion
            formValues={formValues}
            setFormValues={setFormValues}
            handleChange={handleChange}
          />
          <FacilityInfoAccordion {...{ formValues, setFormValues, handleChange }} />
          <CogenerationAccordion {...{ formValues, setFormValues, handleChange }} />
          <PVAccordion {...{ formValues, setFormValues, handleChange }} />
          <HydrogenAccordion {...{ formValues, setFormValues, handleChange }} />
          <DemandResponseAccordion {...{ formValues, setFormValues, handleChange }} />
          <AdvancedSettingsAccordion {...{ formValues, setFormValues, handleChange }} />
          <SystemInfoAccordion {...{ formValues, setFormValues, handleChange }} />

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#38B2AC',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#319795',
                },
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Submit All Data
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}