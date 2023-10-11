// export default listView;

import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
import Papa from "papaparse";
import { teacherSearch } from "routes/links";

function TeacherListView() {
  const [token, setToken] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "name" },
    { field: "dateOfBirth" },
    { field: "board" },
    {
      field: "schoolUdise",
      filter: true,
      editable: true,
      filterParams: {
        defaultOption: "equals",
      },
    },
    { field: "email" },

    { field: "username" },

    { field: "mobile" },
    { field: "gender" },

    { field: "role" },

    { field: "createdBy" },
    { field: "updatedBy" },
    { field: "teacherId" },
    { field: "groups" },
    { field: "educationalQualification" },

    { field: "currentRole" },
    { field: "natureOfAppointment" },
    { field: "appointedPost" },
    { field: "totalTeachingExperience" },
    { field: "totalHeadteacherExperience" },
    { field: "classesTaught" },
    { field: "coreSubjectTaught" },
    { field: "attendedInserviceTraining" },
    { field: "lastTrainingAttendedTopic" },
    { field: "lastTrainingAttendedYear" },
    { field: "trainedInComputerDigitalteaching" },
    { field: "userId", filter: true },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onBtnExportFields = useCallback(() => {
    // Get the visible (filtered) rows from the grid
    const filteredData = gridRef.current.api.getModel().rowsToDisplay;

    if (filteredData.length === 0) {
      alert("No data to export. Please apply a filter.");
      return;
    }

    // Extract the "UserID" and "Password" fields
    const selectedFieldsData = filteredData.map((row) => ({
      Name: row.data.name,
      UserName: row.data.username,
      Password: row.data.password,
    }));

    // Convert the data to CSV format using PapaParse
    const csvData = Papa.unparse(selectedFieldsData);

    // Create a Blob containing the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "teacher_data_filtered_user_password.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const apiUrl = teacherSearch;
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      limit: "",
      page: 0,
      filters: {},
    };

    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        setRowData(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <div className="ag-theme-material" style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          onClick={onBtnExport}
          style={{
            background: "#41C88E",
            border: "none",
            borderRadius: "5px",
            display: "flex", // Center align vertically
            alignItems: "center",
          }}
        >
          <FileDownloadOutlinedIcon
            style={{
              color: "white",
              fontSize: "largest",
            }}
          />
          <H4 style={{ color: "white" }}> Download Template </H4>
        </button>
        <button
          onClick={onBtnExportFields}
          style={{
            background: "#41C88E",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px", // Add some spacing between the buttons
            display: "flex", // Center align vertically
            alignItems: "center",
          }}
        >
          <FileDownloadOutlinedIcon
            style={{
              color: "white",
              fontSize: "largest",
            }}
          />
          <H4 style={{ color: "white" }}> Download username & password </H4>
        </button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        onCellClicked={cellClickedListener}
        pagination={true}
        paginationAutoPageSize={true}
        overlayNoRowsTemplate={'<span>Loading Teacher records....</span>'}
      ></AgGridReact>{" "}
    </div>
  );
}

export default TeacherListView;
