import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FacilityInfoAccordion = ({ formValues, setFormValues, handleChange }) => (
  <Accordion
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
      aria-controls="panel2a-content"
      id="panel2a-header"
      sx={{
        '& .MuiAccordionSummary-content': {
          fontWeight: 'bold',
          color: '#2D3748',
        },
      }}
    >
      <Typography>Facility Info</Typography>
    </AccordionSummary>

    <AccordionDetails>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <Typography variant="subtitle1">What type of electricity bill do you have?</Typography>
          <RadioGroup name="electricityBill" value={formValues.electricityBill || ''} onChange={handleChange}>
            <FormControlLabel value="TOU" control={<Radio />} label="TOU" />
            <FormControlLabel value="Class B" control={<Radio />} label="Class B" />
            <FormControlLabel value="Comm Class A" control={<Radio />} label="Comm Class A" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">What type of facility is this?</Typography>
          <RadioGroup name="facilityType" value={formValues.facilityType || ''} onChange={handleChange}>
            <FormControlLabel value="Academic" control={<Radio />} label="Academic" />
            <FormControlLabel value="Industrial" control={<Radio />} label="Industrial" />
            <FormControlLabel value="Health" control={<Radio />} label="Health" />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">Do you have a load profile?</Typography>
          <RadioGroup name="hasLoadProfile" value={formValues.hasLoadProfile || ''} onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </Grid>

        {formValues.hasLoadProfile === 'yes' && (
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              {formValues.loadProfileFile ? 'Change File' : 'Upload CSV File'}
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    loadProfileFile: e.target.files[0],
                  }))
                }
              />
            </Button>
            {formValues.loadProfileFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {formValues.loadProfileFile.name}
              </Typography>
            )}
          </Grid>
        )}

        {formValues.hasLoadProfile === 'no' && (
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              A standard load profile will be used.
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography variant="subtitle1">Select your peak load time:</Typography>
          <TextField
            fullWidth
            select
            name="peakLoadTime"
            value={formValues.peakLoadTime || ''}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="">-- Select a time range --</option>
            <option value="06:00-08:00">6 AM – 8 AM</option>
            <option value="08:00-10:00">8 AM – 10 AM</option>
            <option value="10:00-12:00">10 AM – 12 PM</option>
            <option value="12:00-14:00">12 PM – 2 PM</option>
            <option value="14:00-16:00">2 PM – 4 PM</option>
            <option value="16:00-18:00">4 PM – 6 PM</option>
            <option value="18:00-20:00">6 PM – 8 PM</option>
          </TextField>
        </Grid>
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default FacilityInfoAccordion;
