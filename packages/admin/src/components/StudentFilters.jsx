import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { fetchStates, fetchDistricts, fetchBlocks, fetchSchools, fetchClasses } from '../api/filterStudentDetails';

const StudentFilters = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token")); 
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  useEffect(() => {
    fetchStates(token).then(setStates).catch(console.error);
    fetchDistricts(token).then(setDistricts).catch(console.error);
    fetchBlocks(token).then(setBlocks).catch(console.error);
    fetchSchools(token).then(setSchools).catch(console.error);
    fetchClasses(token).then(setClasses).catch(console.error);
  }, [token]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          options={states}
          value={selectedState}
          onChange={(event, newValue) => setSelectedState(newValue)}
          renderInput={(params) => <TextField {...params} label="Select State" variant="outlined" size="small" />}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          options={districts}
          value={selectedDistrict}
          onChange={(event, newValue) => setSelectedDistrict(newValue)}
          renderInput={(params) => <TextField {...params} label="Select District" variant="outlined" size="small" />}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          options={blocks}
          value={selectedBlock}
          onChange={(event, newValue) => setSelectedBlock(newValue)}
          renderInput={(params) => <TextField {...params} label="Select Block" variant="outlined" size="small" />}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          options={schools}
          value={selectedSchool}
          onChange={(event, newValue) => setSelectedSchool(newValue)}
          renderInput={(params) => <TextField {...params} label="Select School" variant="outlined" size="small" />}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          options={classes}
          value={null}
          onChange={(event, newValue) => {}}
          renderInput={(params) => <TextField {...params} label="Select Class" variant="outlined" size="small" />}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default StudentFilters;