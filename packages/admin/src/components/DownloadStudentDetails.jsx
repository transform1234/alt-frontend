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

const DownloadStudentDetails = ({ open, handleClose, rowData }) => {
  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: null,
  });
  const [downloadType, setDownloadType] = useState("Student Details");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvFilename, setCsvFilename] = useState("student_details.csv");

  // Extract usernames from rowData
  useEffect(() => {
    if (rowData && rowData.length) {
      const usernames = rowData.map((item) => item.username);
      setDropdownOptions(usernames); 
    }
  }, [rowData]);

  const handleDownload = () => {
    const selectedUsername = dropdownValues.dropdown1;

    // Find the student record based on the selected username
    const selectedStudent = rowData.find(
      (student) => student.username === selectedUsername
    );

    if (!selectedStudent) {
      alert("No student found for the selected username.");
      return false;
    }

    // Prepare CSV data based on the selected download type
    let dataToDownload = [];
    let filename = "student_details.csv";

    if (downloadType === "Student Details") {
      // Download all student details
      dataToDownload = [
        {
          "User ID": selectedStudent.userId,
          Name: selectedStudent.name,
          Username: selectedStudent.username,
          Email: selectedStudent.email,
          Mobile: selectedStudent.mobile,
          Gender: selectedStudent.gender,
          "Date of Birth": selectedStudent.dateOfBirth,
          Role: selectedStudent.role,
          Board: selectedStudent.board,
          Password: selectedStudent.password,
          "Created By": selectedStudent.createdBy,
          "Updated By": selectedStudent.updatedBy,
          "Student Id": selectedStudent.studentId,
          "Class Name": selectedStudent.className,
          Groups: selectedStudent.groups.join(", "),
          Religion: selectedStudent.religion,
          "School UDISE": selectedStudent.schoolUdise,
          Caste: selectedStudent.caste,
          "Annual Income": selectedStudent.annualIncome,
          "Mother's Education": selectedStudent.motherEducation,
          "Father's Education": selectedStudent.fatherEducation,
          "Mother's Occupation": selectedStudent.motherOccupation,
          "Father's Occupation": selectedStudent.fatherOccupation,
          "Number of Siblings": selectedStudent.noOfSiblings,
          "Student Enroll ID": selectedStudent.studentEnrollId,
          Promotion: selectedStudent.promotion,
          School: selectedStudent.schoolName,
          State: selectedStudent.state,
          District: selectedStudent.district,
          Block: selectedStudent.block,
        },
      ];
      filename = `${selectedStudent.username}_details.csv`;
    } else if (downloadType === "Username and Password") {
      // Download only username, name, and password
      dataToDownload = [
        {
          Name: selectedStudent.name,
          Username: selectedStudent.username,
          Password: selectedStudent.password,
        },
      ];
      filename = `${selectedStudent.username}_credentials.csv`;
    }

    // Set the CSV data and filename
    setCsvData(dataToDownload);
    setCsvFilename(filename);
  };

  const handleChange = (event, value, name) => {
    setDropdownValues({ ...dropdownValues, [name]: value });
  };

  const handleRadioChange = (event) => {
    setDownloadType(event.target.value);
    setDropdownValues({
      dropdown1: null,
    });
  };

  // Reset the state when modal is closed
  const handleModalClose = () => {
    setDropdownValues({
      dropdown1: null,
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
            md: "400px"
          },
          bgcolor: "background.paper",
          border: "1px solid #cad0d8",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
          overflowY: "auto", 
          maxHeight: "90vh" 
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" component="h2">
            Download Student Details
          </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </Box>

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
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
            />
            <FormControlLabel
              value="Username and Password"
              control={<Radio />}
              label="Username and Password"
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.875rem" } }}
            />
          </RadioGroup>
        </FormControl>

        {/* Dropdown */}
        <Box sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            options={dropdownOptions}
            value={dropdownValues.dropdown1}
            onChange={(event, value) => handleChange(event, value, "dropdown1")}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Username" />
            )}
          />
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <CSVLink
            data={csvData}
            filename={csvFilename}
            onClick={handleDownload}
          >
            <Button variant="outlined"  disabled={!dropdownValues.dropdown1} startIcon={<DownloadIcon />}>
              Download
            </Button>
          </CSVLink>
        </Box>
      </Box>
    </Modal>
  );
};

export default DownloadStudentDetails;
