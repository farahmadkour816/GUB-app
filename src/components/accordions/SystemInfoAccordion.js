// --- SystemInfoAccordion.js ---
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SystemInfoAccordion = ({ formValues, handleChange }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography fontWeight="bold">System Info</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="System Name"
            name="systemName"
            value={formValues.systemName || ''}
            onChange={handleChange}
            placeholder="e.g., York Campus Energy Simulation"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Start Year"
            name="startYear"
            type="number"
            value={formValues.startYear || ''}
            onChange={handleChange}
            placeholder="e.g., 2024"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="End Year"
            name="endYear"
            type="number"
            value={formValues.endYear || ''}
            onChange={handleChange}
            placeholder="e.g., 2030"
          />
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default SystemInfoAccordion;