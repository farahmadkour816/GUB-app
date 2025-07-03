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
  Box,
  Tabs,
  Tab
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ mt: 2 }}>{children}</Box>;
}

const PVAccordion = ({ formValues, handleChange }) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Accordion
        disabled={formValues.wantsPV === 'no'}
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
          expandIcon={<ExpandMoreIcon sx={{ color: '#2F855A' }} />}
          sx={{
            '& .MuiAccordionSummary-content': {
              fontWeight: 'bold',
              color: '#22543D',
            },
          }}
        >
          <Typography>PV</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Do you want to install a PV system?</Typography>
              <RadioGroup name="wantsPV" value={formValues.wantsPV || ''} onChange={handleChange} row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.wantsPV === 'yes' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you have temperature data?</Typography>
                  <RadioGroup name="hasTemperature" value={formValues.hasTemperature || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasTemperature === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="Temperature (°C)" name="temperature" type="number" value={formValues.temperature} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasTemperature === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">A standard temperature profile will be used.</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you have solar radiation data?</Typography>
                  <RadioGroup name="hasSolarRadiation" value={formValues.hasSolarRadiation || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasSolarRadiation === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="Solar Radiation (W/m²)" name="solarRadiation" type="number" value={formValues.solarRadiation} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasSolarRadiation === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">A standard solar radiation profile will be used.</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you want to specify the maximum PV system capacity?</Typography>
                  <RadioGroup name="hasCustomPVMax" value={formValues.hasCustomPVMax || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCustomPVMax === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="PV System Max Size (kW)" name="customPVMax" type="number" value={formValues.customPVMax || ''} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasCustomPVMax === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Default of 15,000 kW will be used.</Typography>
                  </Grid>
                )}

                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    Input the rest of the details
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 650,
            borderRadius: 3,
            boxShadow: 24,
            color: 'white',
            background: 'linear-gradient(to right, #1A202C, #319795)',
            p: 4,
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(e, newVal) => setTabIndex(newVal)}
            textColor="inherit"
            indicatorColor="secondary"
            centered
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: '#E2E8F0',
                fontWeight: 'bold',
              },
              '& .Mui-selected': {
                color: '#81E6D9',
              },
            }}
          >
            <Tab label="Financial" />
            <Tab label="Physical" />
            <Tab label="Economical" />
          </Tabs>

           <TabPanel value={tabIndex} index={0}>
            <Typography color="white" fontWeight="bold" gutterBottom>Installation Cost ($)</Typography>
            <TextField
              fullWidth
              placeholder="Installation Cost ($)"
              name="pvInstallationCost"
              type="number"
              value={formValues.pvInstallationCost || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <Typography color="white" fontWeight="bold" gutterBottom mt={3}>Maintenance Cost ($/year)</Typography>
            <TextField
              fullWidth
              placeholder="Maintenance Cost ($/year)"
              name="pvMaintenanceCost"
              type="number"
              value={formValues.pvMaintenanceCost || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <Typography color="white" fontWeight="bold" gutterBottom>Available Roof Area (sq.m)</Typography>
            <TextField
              fullWidth
              placeholder="Available Roof Area (sq.m)"
              name="roofArea"
              type="number"
              value={formValues.roofArea || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <Typography color="white" fontWeight="bold" gutterBottom mt={3}>Tilt Angle (degrees)</Typography>
            <TextField
              fullWidth
              placeholder="Tilt Angle (°)"
              name="tiltAngle"
              type="number"
              value={formValues.tiltAngle || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

          <TabPanel value={tabIndex} index={2}>
            <Typography color="white" fontWeight="bold" gutterBottom>Expected Payback Period (years)</Typography>
            <TextField
              fullWidth
              placeholder="Payback Period (years)"
              name="paybackPeriod"
              type="number"
              value={formValues.paybackPeriod || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
            <Typography color="white" fontWeight="bold" gutterBottom mt={3}>Annual Energy Production (kWh)</Typography>
            <TextField
              fullWidth
              placeholder="Annual Production (kWh)"
              name="annualEnergy"
              type="number"
              value={formValues.annualEnergy || ''}
              onChange={handleChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

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

export default PVAccordion;