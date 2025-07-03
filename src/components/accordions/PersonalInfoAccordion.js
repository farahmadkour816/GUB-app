import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function PersonalInfoAccordion({ formValues, handleChange }) {
  return (
    <Accordion
      defaultExpanded
      TransitionProps={{ unmountOnExit: true }}
      sx={{
        borderRadius: 2,
        mb: 1.5,
        backgroundColor: '#EDF2F7',
        transition: 'all 0.3s ease',
        '&.Mui-expanded': {
          mt: 1,
          boxShadow: 3,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#319795' }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          '& .MuiAccordionSummary-content': {
            fontWeight: 'bold',
            color: '#2D3748',
          },
        }}
      >
        <Typography>Personal Info</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formValues.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formValues.email || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="number"
              value={formValues.number || ''}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
