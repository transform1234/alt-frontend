// export default listView;

import React, { useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function StudentListView() {
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
    console.log("cellClicked", event);
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
