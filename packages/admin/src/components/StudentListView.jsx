import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Papa from "papaparse";
import axios from "axios";
import studentResetPasswordAPI from "api/StudentResetPasswordAPI";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import { studentSearch } from "routes/links";
import { Button } from "native-base";
import { result } from "lodash";
import studentUsernamePasswordAPI from "api/studentUsernamePasswordAPI";
import studentUdiseAPI from "api/studentUdiseAPI";
import FORMmodal from "react-modal";
import styles from "../pages/StudentPage.module.css";
import StudentForm from "../components/StudentForm";

import DownloadCsv from "./DownloadCsv";
import DownloadStudentDetails from "./DownloadStudentDetails";
import StudentFilters from "./StudentFilters";

function StudentListView() {
  const [token, setToken] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isDownloadCsv, setDownloadCsv] = useState(false);
  const [isDownloadStudentDetails, setisDownloadStudentDetails] =
    useState(false);

  // const [filters, setFilters] = useState({
  //   state: null,
  //   district: null,
  //   block: null,
  //   school: null,
  //   class: null,
  // });

  const [filters, setFilters] = useState({});

  const openPrompt = async (data) => {
    let person = window.prompt(
      `Enter a new password for user ${data.username}`
    );
    if (person == null || person == "") {
      alert("Please enter a valid password");
    } else {
      const result = await studentResetPasswordAPI(data.username, person);
      if (result == true) {
        alert("Password reset Successful.");
        window.location.reload();
      } else {
        alert("Password reset failed");
      }
    }
  };

  const handleEditClick = (data) => {
    setSelectedStudent(data);
    setIsEditModalOpen(true);
  };

  const handleClose = () => {
    setIsEditModalOpen(false);
  };

  const [columnDefs] = useState([
    {
      width: 150,
      cellRenderer: function (params) {
        // Replace with your desired label
        const combinedFunction = (rowData) => {
          openPrompt(rowData);
        };

        return (
          <div>
            <button
              onClick={() => combinedFunction(params.data)}
              style={{
                background: "none",
                border: "none",
                color: "#6461D2",
                textDecoration: "underline",
                display: "flex", // Center align vertically
                alignItems: "center",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              {" "}
              <SyncLockIcon /> Password
            </button>
          </div>
        );
      },
    },
    // {
    //   headerName: "Delete",
    //   field: "actions",
    //   width: 100,
    //   cellRenderer: function (params) {
    //     const label = (
    //       <PersonRemoveIcon
    //         style={{ color: "#EE4436", fontSize: "large", cursor: "pointer" }}
    //       />
    //     ); // Replace with your desired label
    //     const handleClick = async () => {
    //     };

    //     return <div onClick={handleClick}>{label}</div>;
    //   },
    // },
    {
      headerName: "",
      field: "actions",
      width: 80,
      cellRenderer: function (params) {
        return (
          <div
            style={{
              color: "blue",
              cursor: "pointer",
              fontWeight: "medium",
            }}
            onClick={() => handleEditClick(params.data)}
          >
            Edit
          </div>
        );
      },
    },
    { field: "name" , editable: true, },
    { field: "dateOfBirth", width: 150 },
    { field: "board", width: 150 },
    { field: "schoolName", 
      width: 250 ,
      editable: true
    },
    {
      field: "schoolUdise",
      filter: true,
      editable: true,
      filterParams: {
        defaultOption: "equals",
      },
    },
    { field: "email" },
    { field: "username", editable: true, },

    { field: "mobile" },
    { field: "gender" },

    { field: "role" },

    { field: "studentId" },
    { field: "groups" },
    { field: "religion" },

    { field: "caste" },
    { field: "annualIncome" },
    { field: "motherEducation" },
    { field: "motherEducation" },
    { field: "motherOccupation" },
    { field: "fatherOccupation" },
    { field: "noOfSiblings" },
  ]);

  const onBtnExportUdise = async () => {
    let person = window.prompt(`Enter a School Udise`);
    person = person.trim();
    if (person == null || person == "") {
      alert("Please enter a valid Udise");
    } else {

      const result = await studentUdiseAPI(person);
      if (result) {
        const filteredData = result.data.data.map((item) => {
          // Create a copy of the item without the password field
          const { password, ...rest } = item;
          return rest;
        });

        // Convert the data to CSV format using PapaParse
        const csvData = Papa.unparse(filteredData);
        // Now, csvData will not contain the password field

        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "student_data_filtered_UDISE.csv";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const cellClickedListener = useCallback((event) => {
  }, []);

  const onBtnExportFields = async () => {
    let person = window.prompt(`Enter a School Udise`);
    person = person.trim();
    if (person == null || person == "") {
      alert("Please enter a valid Udise");
    } else {

      const result = await studentUsernamePasswordAPI(person);
      if (result) {
        const filteredData = result.data.data;
        const selectedFieldsData = filteredData.map((row) => ({
          Name: row.name,
          UserName: row.username,
          Password: row.password,
          Class: row.className,
        }));

        // Convert the data to CSV format using PapaParse
        const csvData = Papa.unparse(selectedFieldsData);

        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "student_data_filtered_user_password.csv";
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const onBtnExportDetails = async () => {
    let username = window.prompt(`Enter a username for student details`);
    username = username.trim();
    if (username == null || username == "") {
      alert("Please enter a valid username");
    } else {
      // Find the row corresponding to the entered username in the rowData array
      const student = rowData.find((student) => student.username === username);

      if (student) {
        // Convert student details to CSV format
        const csvData = Papa.unparse([student]);

        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

        // Create a download link and trigger the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${username}_details.csv`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Student not found in the table");
      }
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  const handleFiltersChange = (dropdownValues) => {
    const {
      stateDropdown: state,
      districtDropdown: district,
      blockDropdown: block,
      schoolNameDropdown: schoolName,
      classNameDropdown: className,
    } = dropdownValues;

    const newFilters = {};
    if (state) newFilters.state = { eq: state.label };
    if (district) newFilters.district = { eq: district.label };
    if (block) newFilters.block = { eq: block.label };
    if (schoolName) newFilters.schoolName = { eq: schoolName.udiseCode };
    if (className) newFilters.class = { eq: className.label };

    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const headers = {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const requestData = {
          limit: 25,
          page: 1,
          filters: filters || {}, // Pass filters object, empty if no filters selected
        };

        const response = await axios.post(studentSearch, requestData, {
          headers,
        });
        setRowData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function whenever filters or token change
  }, [filters, token]); // The API call is triggered on `filters` or `token` change

  const openDownloadCsvModal = () => {
    setDownloadCsv(true);
  };

  const closeDownloadCsvModal = () => {
    setDownloadCsv(false);
  };
  const openDownloadStudentDetailsModal = () => {
    setisDownloadStudentDetails(true);
  };

  const closeDownloadStudentDetailsModal = () => {
    setisDownloadStudentDetails(false);
  };
  return (
    <div
      className="ag-theme-material"
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          onClick={openDownloadCsvModal}
          style={{
            background: "#41C88E",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px",
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <FileDownloadOutlinedIcon
            style={{
              color: "white",
              fontSize: "largest",
            }}
          />
          <H4 style={{ color: "white" }}>Download Students Details</H4>
        </button>
        <DownloadCsv
          open={isDownloadCsv}
          handleClose={closeDownloadCsvModal}
          // rowData={rowData}
        />
        <button
          onClick={openDownloadStudentDetailsModal}
          style={{
            background: "#41C88E",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px",
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
          }}
        >
          <FileDownloadOutlinedIcon
            style={{
              color: "white",
              fontSize: "largest",
            }}
          />
          <H4 style={{ color: "white" }}>Download Student Details</H4>
        </button>
        <DownloadStudentDetails
          open={isDownloadStudentDetails}
          handleClose={closeDownloadStudentDetailsModal}
          // rowData={rowData}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}>
        <StudentFilters handleFiltersChange={handleFiltersChange} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingBottom: "10px",
          cursor: "pointer",
          zIndex: "1",
        }}
      ></div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        onCellClicked={cellClickedListener}
        pagination={true}
        paginationPageSize={5}
        overlayNoRowsTemplate={"<span>Loading Student records....</span>"}
        domLayout="autoHeight"
      ></AgGridReact>{" "}
      {isEditModalOpen && (
        <FORMmodal
          isOpen={isEditModalOpen}
          onRequestClose={handleClose}
          contentLabel="Edit Modal"
          ariaHideApp={false}
          className={styles.formModal}
        >
          <button onClick={handleClose} className={styles.closeButton}>
            ❌
          </button>
          <div className={styles.mainDiv}>
            <StudentForm studentData={selectedStudent} />
          </div>
        </FORMmodal>
      )}
    </div>
  );
}

export default StudentListView;
