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
    stateDropdown: null,
    districtDropdown: null,
    blockDropdown: null,
    schoolNameDropdown: null,
    classNameDropdown: null,
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
      if (!dropdownValues.stateDropdown) return;
      try {
        const token = sessionStorage.getItem("token");
        const districts = await fetchDistricts(
          token,
          dropdownValues.stateDropdown
        );
        setDistrictOptions(districts);

        const blocks = await fetchBlocks(token, dropdownValues.stateDropdown);
        setBlockOptions(blocks);

        const schools = await fetchSchools(token, dropdownValues.stateDropdown);
        setSchoolOptions(schools);
      } catch (error) {
        console.error("Error loading districts:", error);
      }
    };
    loadDistricts();
  }, [dropdownValues.stateDropdown]);

  // Update blocks based on selected district
  useEffect(() => {
    const loadBlocks = async () => {
      if (!dropdownValues.districtDropdown) return;
      try {
        const token = sessionStorage.getItem("token");

        const blocks = await fetchBlocks(
          token,
          dropdownValues.stateDropdown,
          dropdownValues.districtDropdown
        );
        setBlockOptions(blocks);
      } catch (error) {
        console.error("Error loading blocks:", error);
      }
    };
    loadBlocks();
  }, [dropdownValues.districtDropdown]);

  // Update schools based on selected block or fetch all if none is selected
  useEffect(() => {
    const loadSchools = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const schools = await fetchSchools(
          token,
          dropdownValues.stateDropdown,
          dropdownValues.districtDropdown,
          dropdownValues.blockDropdown
        );
        setSchoolOptions(schools);
      } catch (error) {
        console.error("Error loading schools:", error);
      }
    };
    loadSchools();
  }, [dropdownValues.blockDropdown]);

  // Fetch classes based on selected school
  useEffect(() => {
    const loadClasses = async () => {
      if (!dropdownValues.schoolNameDropdown) return;
      try {
        const token = sessionStorage.getItem("token");
        const classes = await fetchClasses(
          token,
          dropdownValues.schoolNameDropdown
        );
        setClassOptions(classes);
      } catch (error) {
        console.error("Error loading classes:", error);
      }
    };
    loadClasses();
  }, [dropdownValues.schoolNameDropdown]);

  const handleChange = (event, value, name) => {
    const dropdownOrder = [
      "stateDropdown",
      "districtDropdown",
      "blockDropdown",
      "schoolNameDropdown",
      "classNameDropdown",
    ];

    const changedDropdownIndex = dropdownOrder.indexOf(name);
    const updatedDropdownValues = dropdownOrder.reduce(
      (acc, dropdown, index) => {
        if (index <= changedDropdownIndex) {
          acc[dropdown] =
            index === changedDropdownIndex ? value : acc[dropdown];
        } else {
          acc[dropdown] = null;
        }
        return acc;
      },
      { ...dropdownValues }
    );

    setDropdownValues(updatedDropdownValues);
    handleFiltersChange(updatedDropdownValues);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* State Dropdown */}
      <Grid item xs={12} sm={2.4}>
        <Autocomplete
          disablePortal
          options={stateOptions}
          value={dropdownValues.stateDropdown}
          onChange={(event, value) =>
            handleChange(event, value, "stateDropdown")
          }
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
          value={dropdownValues.districtDropdown}
          onChange={(event, value) =>
            handleChange(event, value, "districtDropdown")
          }
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
          value={dropdownValues.blockDropdown}
          onChange={(event, value) =>
            handleChange(event, value, "blockDropdown")
          }
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
          value={dropdownValues.schoolNameDropdown}
          onChange={(event, value) =>
            handleChange(event, value, "schoolNameDropdown")
          }
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
          value={dropdownValues.classNameDropdown}
          onChange={(event, value) =>
            handleChange(event, value, "classNameDropdown")
          }
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
