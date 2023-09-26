// export default listView;

import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EditModal from "react-modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from "axios";

function StudentListView() {
  const [token, setToken] = useState([]);
  const navigate = useNavigate();
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
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
    //       console.log("Record has been removed");
    //     };

    //     return <div onClick={handleClick}>{label}</div>;
    //   },
    // },
    // {
    //   headerName: "",
    //   field: "actions",
    //   width: 80,
    //   cellRenderer: function (params) {
    //     const label = "Edit"; // Replace with your desired label

    //     return (
    //       <div
    //         style={{
    //           color: "blue",
    //           cursor: "pointer",
    //           fontWeight: "medium",
    //         }}
    //       >
    //         {label}
    //       </div>
    //     );
    //   },
    // },

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
    { field: "userId", filter: true, editable: true },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event.data);
    localStorage.setItem("selectedRowData", JSON.stringify(event.data));
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  //Download username and pass with prompt

  // const onBtnExportFields = useCallback(() => {
  //   // Get the selected user ID for filtering
  //   const selectedUserId = prompt("Enter the User ID to filter:");

  //   if (!selectedUserId) {
  //     alert("User ID is required.");
  //     return;
  //   }

  //   // Filter the data to include only the selected user's information
  //   const filteredData = rowData.filter((row) => row.userId === selectedUserId);

  //   if (filteredData.length === 0) {
  //     alert(`No data found for User ID: ${selectedUserId}`);
  //     return;
  //   }

  //   // Extract the "UserID" and "Password" fields
  //   const selectedFieldsData = filteredData.map((row) => ({
  //     UserID: row.userId,
  //     Password: row.password,
  //   }));

  //   // Convert the data to CSV format using PapaParse
  //   const csvData = Papa.unparse(selectedFieldsData);

  //   // Create a Blob containing the CSV data
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  //   // Create a download link and trigger the download
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = `student_data_${selectedUserId}_user_password.csv`;
  //   link.style.display = "none";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }, [rowData]);

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
    link.download = "student_data_filtered_user_password.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    console.log("FIRST useEffect");
    console.log(token);
  }, []);

  useEffect(() => {
    console.log("All school list");
    console.log(token);

    const apiUrl = "https://alt.uniteframework.io/api/v1/student/search";
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
        console.log("SCHOOL List");
        console.log(response.data.data);
        setRowData(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [token]);

  return (
    <div className="ag-theme-material" style={{ height: 400, width: "100%" }}>
      <button
        onClick={onBtnExport}
        style={{ background: "#41C88E", border: "none", borderRadius: "5px" }}
      >
        <FileDownloadOutlinedIcon
          style={{ color: "white", fontSize: "largest" }}
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
        }}
      >
        <FileDownloadOutlinedIcon
          style={{ color: "white", fontSize: "largest" }}
        />
        <H4 style={{ color: "white" }}> Download username & password </H4>
      </button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        onCellClicked={cellClickedListener}
        pagination={true}
        paginationAutoPageSize={true}
      ></AgGridReact>{" "}
    </div>
  );
}

export default StudentListView;
