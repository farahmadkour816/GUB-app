// --- DemandResponseAccordion.js ---
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
  Checkbox,
  Button,
  Modal,
  Box,
  Tabs,
  Tab,
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { months } from './AccordionShared';

function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ mt: 2 }}>{children}</Box>;
}

const DemandResponseAccordion = ({ formValues, setFormValues, handleChange }) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
<Accordion
  disabled={formValues.participatesInDR === 'no'}
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
  <Typography>Demand Response (DR)</Typography>
</AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <Typography variant="subtitle1">Do you participate in Demand Response (DR)?</Typography>
              <RadioGroup name="participatesInDR" value={formValues.participatesInDR || ''} onChange={handleChange} row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>

            {formValues.participatesInDR === 'yes' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">How would you like to provide DR activation periods?</Typography>
                  <RadioGroup name="drMethod" value={formValues.drMethod || ''} onChange={handleChange} row>
                    <FormControlLabel value="default" control={<Radio />} label="Use default DR months" />
                    <FormControlLabel value="customMonths" control={<Radio />} label="Select active months" />
                  </RadioGroup>
                </Grid>

                {formValues.drMethod === 'customMonths' && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Select the months you participate in DR:</Typography>
                    <Grid container spacing={1}>
                      {months.map((month) => (
                        <Grid item key={month}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formValues.drMonths?.includes(month) || false}
                                onChange={(e) => {
                                  const selected = formValues.drMonths || [];
                                  const updated = e.target.checked
                                    ? [...selected, month]
                                    : selected.filter((m) => m !== month);
                                  setFormValues((prev) => ({
                                    ...prev,
                                    drMonths: updated,
                                  }));
                                }}
                              />
                            }
                            label={month}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}

                {formValues.drMethod === 'default' && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      DR will be assumed for the 6 summer months (May–October), matching the default simulation.
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
            <Tab label="Event Settings" />
            <Tab label="Control Strategies" />
            <Tab label="Revenue Impact" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">
              Event Settings
            </Typography>
            <Typography variant="subtitle1" color="#CBD5E0">
              Max DR Events per Month
            </Typography>
            <TextField
              fullWidth
              placeholder="Max Events"
              name="drMaxEvents"
              type="number"
              value={formValues.drMaxEvents || ''}
              onChange={handleChange}
              sx={{ mt: 1, backgroundColor: 'white', borderRadius: 1 }}
            />
          </TabPanel>

          <TabPanel value={tabIndex} index={1}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">
              Control Strategies
            </Typography>
            <Typography variant="subtitle1" color="#CBD5E0">
              Pre-cooling Enabled
            </Typography>
            <RadioGroup
              name="drPrecooling"
              value={formValues.drPrecooling || ''}
              onChange={handleChange}
              row
              sx={{ mt: 1 }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </TabPanel>

          <TabPanel value={tabIndex} index={2}>
            <Typography variant="h6" gutterBottom color="#E6FFFA">
              Revenue Impact
            </Typography>
            <Typography variant="subtitle1" color="#CBD5E0">
              Estimated DR Incentives ($/year)
            </Typography>
            <TextField
              fullWidth
              placeholder="Annual Incentives"
              name="drRevenue"
              type="number"
              value={formValues.drRevenue || ''}
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

export default DemandResponseAccordion;