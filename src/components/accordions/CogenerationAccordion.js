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

const CogenerationAccordion = ({ formValues, setFormValues, handleChange }) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Accordion
        disabled={formValues.hasCogens === 'no'}
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
          aria-controls="panel-cogen-content"
          id="panel-cogen-header"
          sx={{
            '& .MuiAccordionSummary-content': {
              fontWeight: 'bold',
              color: '#22543D',
            },
          }}
        >
          <Typography>Co-Generation (CHP)</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Do you have Co-Gens (Combined Heat and Power)?</Typography>
              <RadioGroup name="hasCogens" value={formValues.hasCogens || ''} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.hasCogens === 'yes' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you have a specific Co-Gen size?</Typography>
                  <RadioGroup name="cogenSizeKnown" value={formValues.cogenSizeKnown || ''} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.cogenSizeKnown === 'yes' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Co-Gen Size (kW)"
                      name="cogenSize"
                      value={formValues.cogenSize || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                )}

                {formValues.cogenSizeKnown === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      A standard co-gen size will be used.
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you have a specific capacity factor?</Typography>
                  <RadioGroup name="hasCapacityFactor" value={formValues.hasCapacityFactor || ''} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCapacityFactor === 'yes' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Capacity Factor (%)"
                      name="capacityFactor"
                      value={formValues.capacityFactor || ''}
                      onChange={handleChange}
                      InputProps={{ endAdornment: <Typography>%</Typography> }}
                    />
                  </Grid>
                )}

                {formValues.hasCapacityFactor === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      A standard capacity factor will be used.
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Do you want to specify the number of Co-Gens?</Typography>
                  <RadioGroup name="hasCustomCogenCount" value={formValues.hasCustomCogenCount || ''} onChange={handleChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>

                {formValues.hasCustomCogenCount === 'yes' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Number of Co-Gens"
                      name="customCogenCount"
                      value={formValues.customCogenCount || ''}
                      onChange={handleChange}
                    />
                  </Grid>
                )}

                {formValues.hasCustomCogenCount === 'no' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Default of 2 Co-Gens will be used.
                    </Typography>
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
  <Typography variant="h6" gutterBottom color="#E6FFFA">
    Financial Details
  </Typography>
  <Typography variant="subtitle1" color="#CBD5E0">
    Capital Cost ($)
  </Typography>
  <TextField
    fullWidth
    placeholder="Capital Cost ($)"
    name="capitalCost"
    type="number"
    value={formValues.capitalCost || ''}
    onChange={handleChange}
    sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
  />
</TabPanel>

<TabPanel value={tabIndex} index={1}>
  <Typography variant="h6" gutterBottom color="#E6FFFA">
    Physical Details
  </Typography>
  <Typography variant="subtitle1" color="#CBD5E0">
    Footprint (sq.m)
  </Typography>
  <TextField
    fullWidth
    placeholder="Footprint (sq.m)"
    name="footprint"
    type="number"
    value={formValues.footprint || ''}
    onChange={handleChange}
    sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
  />
</TabPanel>

<TabPanel value={tabIndex} index={2}>
  <Typography variant="h6" gutterBottom color="#E6FFFA">
    Economical Details
  </Typography>
  <Typography variant="subtitle1" color="#CBD5E0">
    Annual Savings ($)
  </Typography>
  <TextField
    fullWidth
    placeholder="Annual Savings ($)"
    name="annualSavings"
    type="number"
    value={formValues.annualSavings || ''}
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

export default CogenerationAccordion;