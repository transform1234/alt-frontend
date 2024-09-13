import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  fetchStates,
  fetchDistricts,
  fetchBlocks,
  fetchSchools,
  fetchClasses,
} from "../api/filterStudentDetails";

const StudentFilters = ({ handleFiltersChange }) => {
  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: null,
    dropdown2: null,
    dropdown3: null,
    dropdown4: null,
    dropdown5: null,
  });

  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const states = await fetchStates(token);
        setStateOptions(states);
      } catch (error) {
        console.error("Error loading states:", error);
      }
    };

    const loadAllDistricts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const districts = await fetchDistricts(token);
        setDistrictOptions(districts);
      } catch (error) {
        console.error("Error loading districts:", error);
      }
    };

    const loadAllBlocks = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const blocks = await fetchBlocks(token);
        setBlockOptions(blocks);
      } catch (error) {
        console.error("Error loading blocks:", error);
      }
    };

    const loadAllSchool = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const schools = await fetchSchools(token);
        setSchoolOptions(schools);
      } catch (error) {
        console.error("Error loading blocks:", error);
      }
    };

    loadStates();
    loadAllDistricts();
    loadAllBlocks();
    loadAllSchool();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      if (!dropdownValues.dropdown1) return;
      try {
        const token = sessionStorage.getItem("token");
        const districts = await fetchDistricts(token, dropdownValues.dropdown1);
        setDistrictOptions(districts);

        const blocks = await fetchBlocks(token, dropdownValues.dropdown1);
        setBlockOptions(blocks);

        const schools = await fetchSchools(token, dropdownValues.dropdown1);
        setSchoolOptions(schools);
      } catch (error) {
        console.error("Error loading districts:", error);
      }
    };
    loadDistricts();
  }, [dropdownValues.dropdown1]);

  // Update blocks based on selected district
  useEffect(() => {
    const loadBlocks = async () => {
      if (!dropdownValues.dropdown2) return;
      try {
        const token = sessionStorage.getItem("token");

        const blocks = await fetchBlocks(
          token,
          dropdownValues.dropdown1,
          dropdownValues.dropdown2
        );
        setBlockOptions(blocks);
      } catch (error) {
        console.error("Error loading blocks:", error);
      }
    };
    loadBlocks();
  }, [dropdownValues.dropdown2]);

  // Update schools based on selected block or fetch all if none is selected
  useEffect(() => {
    const loadSchools = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const schools = await fetchSchools(
          token,
          dropdownValues.dropdown1,
          dropdownValues.dropdown2,
          dropdownValues.dropdown3
        );
        setSchoolOptions(schools);
      } catch (error) {
        console.error("Error loading schools:", error);
      }
    };
    loadSchools();
  }, [dropdownValues.dropdown3]);

  // Fetch classes based on selected school
  useEffect(() => {
    const loadClasses = async () => {
      if (!dropdownValues.dropdown4) return;
      try {
        const token = sessionStorage.getItem("token");
        const classes = await fetchClasses(token, dropdownValues.dropdown4);
        setClassOptions(classes);
      } catch (error) {
        console.error("Error loading classes:", error);
      }
    };
    loadClasses();
  }, [dropdownValues.dropdown4]);

  const handleChange = (event, value, name) => {
    const updatedDropdownValues = { ...dropdownValues, [name]: value };
    setDropdownValues(updatedDropdownValues);

    // Call the callback function to notify parent component about the change
    handleFiltersChange(updatedDropdownValues);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* State Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={stateOptions}
          value={dropdownValues.dropdown1}
          onChange={(event, value) => handleChange(event, value, "dropdown1")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select State"
              variant="outlined"
              size="small"
            />
          )}
          fullWidth
        />
      </Grid>

      {/* District Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={districtOptions}
          value={dropdownValues.dropdown2}
          onChange={(event, value) => handleChange(event, value, "dropdown2")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select District"
              variant="outlined"
              size="small"
            />
          )}
          fullWidth
        />
      </Grid>

      {/* Block Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={blockOptions}
          value={dropdownValues.dropdown3}
          onChange={(event, value) => handleChange(event, value, "dropdown3")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Block"
              variant="outlined"
              size="small"
            />
          )}
          fullWidth
        />
      </Grid>

      {/* School Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={schoolOptions}
          value={dropdownValues.dropdown4}
          onChange={(event, value) => handleChange(event, value, "dropdown4")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select School"
              variant="outlined"
              size="small"
            />
          )}
          fullWidth
        />
      </Grid>

      {/* Class Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={classOptions}
          value={dropdownValues.dropdown5}
          onChange={(event, value) => handleChange(event, value, "dropdown5")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Class"
              variant="outlined"
              size="small"
            />
          )}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default StudentFilters;
