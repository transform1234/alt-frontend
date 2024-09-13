import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import {
  fetchStates,
  fetchDistricts,
  fetchBlocks,
  fetchSchools,
  fetchClasses,
} from "../api/filterStudentDetails";

const DownloadCsv = ({ open, handleClose, rowData }) => {
  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: null, // State
    dropdown2: null, // District
    dropdown3: null, // Block
    dropdown4: null, // School
    dropdown5: null, // Class
  });

  const [downloadType, setDownloadType] = useState("Student Details");
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [blockOptions, setBlockOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvFilename, setCsvFilename] = useState("student_details.csv");

  // Fetch states initially
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
    loadStates();
  }, []);

  // Load all options (districts, blocks, schools, classes) when a state is selected
  useEffect(() => {
    const loadDataForState = async () => {
      if (!dropdownValues.dropdown1) return; // Check if state is selected
      try {
        const token = sessionStorage.getItem("token");
        const districts = await fetchDistricts(token, dropdownValues.dropdown1);
        setDistrictOptions(districts);
        
        const blocks = await fetchBlocks(token, dropdownValues.dropdown1);
        setBlockOptions(blocks);
        
        const schools = await fetchSchools(token, dropdownValues.dropdown1);
        setSchoolOptions(schools);
        
        const classes = await fetchClasses(token, dropdownValues.dropdown1);
        setClassOptions(classes);
        
        // No need to reset lower dropdowns, we will just load all options
      } catch (error) {
        console.error("Error loading data for state:", error);
      }
    };
    loadDataForState();
  }, [dropdownValues.dropdown1]);

  // Filter the data based on lower selections (district, block, etc.)
  useEffect(() => {
    const loadFilteredBlocks = async () => {
      if (!dropdownValues.dropdown2) return; // Check if district is selected
      try {
        const token = sessionStorage.getItem("token");
        const blocks = await fetchBlocks(token, dropdownValues.dropdown2);
        setBlockOptions(blocks); // Filter blocks based on the selected district
      } catch (error) {
        console.error("Error loading filtered blocks:", error);
      }
    };
    loadFilteredBlocks();
  }, [dropdownValues.dropdown2]);

  useEffect(() => {
    const loadFilteredSchools = async () => {
      if (!dropdownValues.dropdown3) return; // Check if block is selected
      try {
        const token = sessionStorage.getItem("token");
        const schools = await fetchSchools(token, dropdownValues.dropdown3);
        setSchoolOptions(schools); // Filter schools based on the selected block
      } catch (error) {
        console.error("Error loading filtered schools:", error);
      }
    };
    loadFilteredSchools();
  }, [dropdownValues.dropdown3]);

  useEffect(() => {
    const loadFilteredClasses = async () => {
      if (!dropdownValues.dropdown4) return; // Check if school is selected
      try {
        const token = sessionStorage.getItem("token");
        const classes = await fetchClasses(token, dropdownValues.dropdown4);
        setClassOptions(classes); // Filter classes based on the selected school
      } catch (error) {
        console.error("Error loading filtered classes:", error);
      }
    };
    loadFilteredClasses();
  }, [dropdownValues.dropdown4]);

  const handleDownload = () => {
    let filteredData = rowData;

    // Filter data based on selected dropdowns
    if (dropdownValues.dropdown1) {
      filteredData = filteredData.filter(
        (item) => item.state === dropdownValues.dropdown1
      );
    }
    if (dropdownValues.dropdown2) {
      filteredData = filteredData.filter(
        (item) => item.district === dropdownValues.dropdown2
      );
    }
    if (dropdownValues.dropdown3) {
      filteredData = filteredData.filter(
        (item) => item.block === dropdownValues.dropdown3
      );
    }
    if (dropdownValues.dropdown4) {
      filteredData = filteredData.filter(
        (item) => item.schoolName === dropdownValues.dropdown4
      );
    }
    if (dropdownValues.dropdown5) {
      filteredData = filteredData.filter(
        (item) => item.className === dropdownValues.dropdown5
      );
    }

    if (!filteredData || filteredData.length === 0) {
      alert("No data available for the selected filters.");
      return false;
    }

    let dataToDownload = [];
    let filename = "student_details.csv";

    if (downloadType === "Student Details") {
      dataToDownload = filteredData.map((student) => ({
        "User ID": student.userId,
        Name: student.name,
        Username: student.username,
        Email: student.email,
        Mobile: student.mobile,
        Gender: student.gender,
        "Date of Birth": student.dateOfBirth,
        Role: student.role,
        Board: student.board,
        Password: student.password,
        "Created By": student.createdBy,
        "Updated By": student.updatedBy,
        "Student Id": student.studentId,
        "Class Name": student.className,
        Groups: student.groups.join(", "),
        Religion: student.religion,
        "School UDISE": student.schoolUdise,
        Caste: student.caste,
        "Annual Income": student.annualIncome,
        "Mother's Education": student.motherEducation,
        "Father's Education": student.fatherEducation,
        "Mother's Occupation": student.motherOccupation,
        "Father's Occupation": student.fatherOccupation,
        "Number of Siblings": student.noOfSiblings,
        "Student Enroll ID": student.studentEnrollId,
        Promotion: student.promotion,
        School: student.schoolName,
        State: student.state,
        District: student.district,
        Block: student.block,
      }));
      filename = "filtered_student_details.csv";
    } else if (downloadType === "Username and Password") {
      dataToDownload = filteredData.map((student) => ({
        Name: student.name,
        Username: student.username,
        Password: student.password,
      }));
      filename = "filtered_credentials.csv";
    }

    setCsvData(dataToDownload);
    setCsvFilename(filename);
  };

  const handleChange = (event, value, name) => {
    setDropdownValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRadioChange = (event) => {
    setDownloadType(event.target.value);
  };

  const handleModalClose = () => {
    setDropdownValues({
      dropdown1: null,
      dropdown2: null,
      dropdown3: null,
      dropdown4: null,
      dropdown5: null,
    });
    setDownloadType("Student Details");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "90%",
            sm: "70%",
            md: "400px",
          },
          bgcolor: "background.paper",
          border: "1px solid #cad0d8",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" component="h2">
            Download Students Details
          </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Radio Buttons for Download Type */}
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <FormLabel component="legend">Select Download Type</FormLabel>
          <RadioGroup
            aria-label="download-type"
            name="download-type"
            value={downloadType}
            onChange={handleRadioChange}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <FormControlLabel
              value="Student Details"
              control={<Radio />}
              label="Student Details"
            />
            <FormControlLabel
              value="Username and Password"
              control={<Radio />}
              label="Username and Password"
            />
          </RadioGroup>
        </FormControl>

        {/* State Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={stateOptions}
            value={dropdownValues.dropdown1}
            onChange={(event, value) => handleChange(event, value, "dropdown1")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select State" />
            )}
          />
        </Box>

        {/* District Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={districtOptions}
            value={dropdownValues.dropdown2}
            onChange={(event, value) => handleChange(event, value, "dropdown2")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select District" />
            )}
          />
        </Box>

        {/* Block Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={blockOptions}
            value={dropdownValues.dropdown3}
            onChange={(event, value) => handleChange(event, value, "dropdown3")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select Block" />
            )}
          />
        </Box>

        {/* School Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={schoolOptions}
            value={dropdownValues.dropdown4}
            onChange={(event, value) => handleChange(event, value, "dropdown4")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select School" />
            )}
          />
        </Box>

        {/* Class Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={classOptions}
            value={dropdownValues.dropdown5}
            onChange={(event, value) => handleChange(event, value, "dropdown5")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Select Class" />
            )}
          />
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleModalClose}
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
          <CSVLink
            data={csvData}
            filename={csvFilename}
            onClick={handleDownload}
          >
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Download
            </Button>
          </CSVLink>
        </Box>
      </Box>
    </Modal>
  );
};

export default DownloadCsv;
