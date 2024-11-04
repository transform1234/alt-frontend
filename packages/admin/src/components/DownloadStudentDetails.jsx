import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
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
import axios from "axios";
import { studentSearch } from "routes/links";

const DownloadStudentDetails = ({ open, handleClose }) => {
  const [inputValue, setInputValue] = useState(""); // Store input value
  const [downloadType, setDownloadType] = useState("Student Details");
  const [csvData, setCsvData] = useState([]);
  const [csvFilename, setCsvFilename] = useState("student_details.csv");
  const csvLinkRef = useRef();
  const handleDownload = async () => {
    if (!inputValue) {
      alert("Please enter a username.");
      return;
    }

    const payload = {
      page: 1,
      filters: {
        username: {
          eq: inputValue,
        },
      },
    };

    try {
      const response = await axios.post(
        studentSearch,
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
          },
        }
      );

      const studentData = response.data.data[0]; 
      if (!studentData) {
        alert("No student data found.");
        return;
      }

      // Prepare CSV data
      let dataToDownload = [];
      let filename = "student_details.csv";

      if (downloadType === "Student Details") {
        dataToDownload = [
          {
            "User ID": studentData.userId,
            Name: studentData.name,
            Username: studentData.username,
            Email: studentData.email,
            Mobile: studentData.mobile,
            Gender: studentData.gender,
            "Date of Birth": studentData.dateOfBirth,
            Role: studentData.role,
            Board: studentData.board,
            Password: studentData.password,
            "Created By": studentData.createdBy,
            "Updated By": studentData.updatedBy,
            "Student Id": studentData.studentId,
            "Class Name": studentData.className,
            Groups: studentData.groups.join(", "),
            Religion: studentData.religion,
            "School UDISE": studentData.schoolUdise,
            Caste: studentData.caste,
            "Annual Income": studentData.annualIncome,
            "Mother's Education": studentData.motherEducation,
            "Father's Education": studentData.fatherEducation,
            "Mother's Occupation": studentData.motherOccupation,
            "Father's Occupation": studentData.fatherOccupation,
            "Number of Siblings": studentData.noOfSiblings,
            "Student Enroll ID": studentData.studentEnrollId,
            Promotion: studentData.promotion,
            School: studentData.schoolName,
            State: studentData.state,
            District: studentData.district,
            Block: studentData.block,
          },
        ];
        filename = `${studentData.username}_details.csv`;
      } else if (downloadType === "Username and Password") {
        dataToDownload = [
          {
            Name: studentData.name,
            Username: studentData.username,
            Password: studentData.password,
          },
        ];
        filename = `${studentData.username}_credentials.csv`;
      }

      setCsvData(dataToDownload);
      setCsvFilename(filename);
      setTimeout(() => {
        csvLinkRef.current.link.click();
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); 
  };

  const handleRadioChange = (event) => {
    setDownloadType(event.target.value);
    setInputValue(""); 
  };

  const handleModalClose = () => {
    setInputValue("");
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

        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Enter Username"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="outlined"
            disabled={!inputValue}
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download
          </Button>
          <CSVLink
            data={csvData}
            filename={csvFilename}
            className="hidden"
            ref={csvLinkRef}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DownloadStudentDetails;
