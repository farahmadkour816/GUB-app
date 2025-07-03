import React, { useState } from 'react';
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
  Button,
  Modal,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedSettingsAccordion = ({ formValues, handleChange }) => {
  const [open, setOpen] = useState(false); // 🛠️ Added state

  return (
    <>
      <Accordion
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
          expandIcon={<ExpandMoreIcon sx={{ color: '#2F855A' }} />}
          sx={{
            '& .MuiAccordionSummary-content': {
              fontWeight: 'bold',
              color: '#22543D',
            },
          }}
        >
          <Typography>Advanced System Settings</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2} direction="column">
            {/* Min Battery % */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Do you want to specify the minimum allowed battery percentage?
              </Typography>
              <RadioGroup
                name="hasMinBattery"
                value={formValues.hasMinBattery || ''}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.hasMinBattery === 'yes' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Minimum Battery (%)"
                  name="minBattery"
                  type="number"
                  value={formValues.minBattery || ''}
                  onChange={handleChange}
                  InputProps={{ endAdornment: <Typography>%</Typography> }}
                />
              </Grid>
            )}

            {formValues.hasMinBattery === 'no' && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  A default value of 15% will be used.
                </Typography>
              </Grid>
            )}

            {/* CO2 Emissions Limit */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Do you want to set a CO₂ emissions limit?
              </Typography>
              <RadioGroup
                name="hasCO2Limit"
                value={formValues.hasCO2Limit || ''}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.hasCO2Limit === 'yes' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CO₂ Emission Limit (kg)"
                  name="CO2_limit"
                  type="number"
                  value={formValues.CO2_limit || ''}
                  onChange={handleChange}
                />
              </Grid>
            )}

            {formValues.hasCO2Limit === 'no' && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  No CO₂ constraint will be applied.
                </Typography>
              </Grid>
            )}

            {/* Optimization Weights */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Specify optimization weights (optional)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="α (Cost)"
                    name="alpha"
                    type="number"
                    value={formValues.alpha || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="β (CO₂)"
                    name="beta"
                    type="number"
                    value={formValues.beta || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="γ (Renewable)"
                    name="gamma"
                    type="number"
                    value={formValues.gamma || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Grid Capacity */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Specify grid import capacity (optional)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Minimum Grid Capacity (kW)"
                    name="minCapGrid"
                    type="number"
                    value={formValues.minCapGrid || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Maximum Grid Capacity (kW)"
                    name="maxCapGrid"
                    type="number"
                    value={formValues.maxCapGrid || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Modal Button */}
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{ mt: 2 }}
              >
                More Advanced Options
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Modal itself */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            borderRadius: 3,
            boxShadow: 24,
            color: 'white',
            background: 'linear-gradient(to right, #1A202C, #319795)',
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom color="#E6FFFA">
            Extra Settings
          </Typography>
          <Typography variant="body1" color="#CBD5E0">
            Here you can place additional advanced settings, toggles, or notes.
          </Typography>

          {/* Example field */}
          <TextField
            fullWidth
            label="Experimental Config"
            name="experimentalSetting"
            type="text"
            value={formValues.experimentalSetting || ''}
            onChange={handleChange}
            sx={{ mt: 2, backgroundColor: 'white', borderRadius: 1 }}
          />

          <Box textAlign="right" mt={3}>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={{
                backgroundColor: '#38B2AC',
                '&:hover': {
                  backgroundColor: '#319795',
                },
                fontWeight: 'bold',
              }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdvancedSettingsAccordion;
