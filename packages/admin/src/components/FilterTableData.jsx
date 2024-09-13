import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Autocomplete, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const FilterTableData = ({ open, handleClose, rowData, onApplyFilter }) => {
  const [filterOption, setFilterOption] = useState(null);
  const [filterValues, setFilterValues] = useState([]);
  const [selectedFilterValue, setSelectedFilterValue] = useState(null);

  // Define options for the first dropdown (Select Filter Option)
  const filterOptions = [
    { key: "state", label: "State" },
    { key: "block", label: "Block" },
    { key: "district", label: "District" },
    { key: "schoolUdise", label: "School UDISE" },
    { key: "username", label: "Username" },
    { key: "schoolName", label: "School Name" },
    { key: "className", label: "Class" },
    { key: "board", label: "Board" },
    { key: "userId", label: "User ID" },
    { key: "studentId", label: "Student ID" },
  ];
  

  // Update the second dropdown based on the selected filter option
  useEffect(() => {
    if (filterOption) {
      const uniqueValues = [...new Set(rowData.map((item) => item[filterOption.key]))];
      setFilterValues(uniqueValues);
    } else {
      setFilterValues([]);
    }
  }, [filterOption, rowData]);

  const handleSubmit = () => {
    // Ensure that both filterOption and selectedFilterValue are set
    if (filterOption && selectedFilterValue) {
      onApplyFilter({
        [filterOption.key]: {
          eq: selectedFilterValue // Set the selected filter value under 'eq'
        }
      });
    }
    handleClose(); // Close the modal after submission
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4 
      }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <h2 style={{fontWeight:'500'}}>Filter Table Data</h2>

        {/* First Dropdown for Filter Option */}
        <Autocomplete
          disablePortal
          options={filterOptions}
          getOptionLabel={(option) => option.label}
          value={filterOption}
          onChange={(event, value) => setFilterOption(value)}
          sx={{ width: "100%", marginBottom: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Filter Option" />
          )}
        />

        {/* Second Dropdown for Values */}
        <Autocomplete
          disablePortal
          options={filterValues}
          value={selectedFilterValue}
          onChange={(event, value) => setSelectedFilterValue(value)}
          disabled={!filterOption} // Disable until a filter option is selected
          sx={{ width: "100%", marginBottom: 2 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Filter Value" />
          )}
        />

        {/* Submit Button */}
        <Box sx={{ marginTop: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSubmit} variant="contained" disabled={!filterOption || !selectedFilterValue}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterTableData;
