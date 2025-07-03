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

const HydrogenAccordion = ({ formValues, handleChange }) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Accordion
        disabled={formValues.wantsHydrogen === 'no'}
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
          aria-controls="panel-hydrogen-content"
          id="panel-hydrogen-header"
          sx={{
            '& .MuiAccordionSummary-content': {
              fontWeight: 'bold',
              color: '#22543D',
            },
          }}
        >
          <Typography>Hydrogen System</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Do you want to install a Hydrogen System (Electrolyzer + Fuel Cell)?</Typography>
              <RadioGroup name="wantsHydrogen" value={formValues.wantsHydrogen || ''} onChange={handleChange} row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.wantsHydrogen === 'yes' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you want to specify the maximum electrolyzer size?</Typography>
                  <RadioGroup name="hasCustomElectrolyzer" value={formValues.hasCustomElectrolyzer || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCustomElectrolyzer === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="Electrolyzer Max Size (kW)" name="electrolyzerSize" type="number" value={formValues.electrolyzerSize || ''} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasCustomElectrolyzer === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">A default value of 5000 kW will be used.</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you want to specify the maximum fuel cell size?</Typography>
                  <RadioGroup name="hasCustomFuelCell" value={formValues.hasCustomFuelCell || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCustomFuelCell === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="Fuel Cell Max Size (kW)" name="fuelCellSize" type="number" value={formValues.fuelCellSize || ''} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasCustomFuelCell === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">A default value of 5000 kW will be used.</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you want to specify the hydrogen tank size?</Typography>
                  <RadioGroup name="hasCustomTank" value={formValues.hasCustomTank || ''} onChange={handleChange} row>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCustomTank === 'yes' && (
                  <Grid item xs={12}>
                    <TextField fullWidth label="Tank Size (m³)" name="tankSize" type="number" value={formValues.tankSize || ''} onChange={handleChange} />
                  </Grid>
                )}

                {formValues.hasCustomTank === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">A default value of 50,000 m³ will be used.</Typography>
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
              '& .MuiTab-root': { color: '#E2E8F0', fontWeight: 'bold' },
              '& .Mui-selected': { color: '#81E6D9' },
            }}
          >
            <Tab label="Production" />
            <Tab label="Storage" />
            <Tab label="Distribution" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">Production Details</Typography>
            <Typography variant="subtitle1" color="#CBD5E0">Electrolyzer Efficiency (%)</Typography>
            <TextField
              fullWidth
              placeholder="Electrolyzer Efficiency (%)"
              name="electrolyzerEfficiency"
              type="number"
              value={formValues.electrolyzerEfficiency || ''}
              onChange={handleChange}
              sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">Storage Details</Typography>
            <Typography variant="subtitle1" color="#CBD5E0">Tank Pressure (bar)</Typography>
            <TextField
              fullWidth
              placeholder="Tank Pressure (bar)"
              name="tankPressure"
              type="number"
              value={formValues.tankPressure || ''}
              onChange={handleChange}
              sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

          <TabPanel value={tabIndex} index={2}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">Distribution Details</Typography>
            <Typography variant="subtitle1" color="#CBD5E0">Pipeline Distance (km)</Typography>
            <TextField
              fullWidth
              placeholder="Pipeline Distance (km)"
              name="pipelineDistance"
              type="number"
              value={formValues.pipelineDistance || ''}
              onChange={handleChange}
              sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
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

export default HydrogenAccordion;