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

function StudentListView() {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [rowData] = useState([
    { Name: "Student 1", Gender: "Male", "Date of Birth": "05/06/2010" },
    { Name: "Student 1", Gender: "Female", "Date of Birth": "26/09/2010" },
    { Name: "Student 1", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 1", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 1", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 2", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
    { Name: "Student 3", Gender: "Female", "Date of Birth": "18/02/2010" },
  ]);

  const [columnDefs] = useState([
    {
      headerName: "Delete",
      field: "actions",
      width: 100,
      cellRenderer: function (params) {
        const label = (
          <PersonRemoveIcon
            style={{ color: "#EE4436", fontSize: "large", cursor: "pointer" }}
          />
        ); // Replace with your desired label
        const handleClick = async () => {
          console.log("Record has been removed");
        };

        return <div onClick={handleClick}>{label}</div>;
      },
    },
    {
      headerName: "",
      field: "actions",
      width: 80,
      cellRenderer: function (params) {
        const label = "Edit"; // Replace with your desired label

        return (
          <div
            style={{
              color: "blue",
              cursor: "pointer",
              fontWeight: "medium",
            }}
          >
            {label}
          </div>
        );
      },
    },

    { field: "Name", filter: true },
    { field: "Gender" },
    { field: "Date of Birth" },
    { field: "E-mail" },
    { field: "Mobile" },
    { field: "Udise" },
    { field: "Grade" },
    { field: "Religion" },
    { field: "Caste" },
    { field: "Annual Income" },
    { field: "Mother Education" },
    { field: "Father Education" },
    { field: "Mother Occupation" },
    { field: "Father Occupation" },
    { field: "Siblings" },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event.data);
    localStorage.setItem("selectedRowData", JSON.stringify(event.data));
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

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
