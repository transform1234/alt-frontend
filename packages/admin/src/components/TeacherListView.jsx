// export default listView;

import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";

function TeacherListView() {
  const [token, setToken] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "userId", filter: true },
    { field: "username" },
    { field: "email" },
    { field: "mobile" },
    { field: "gender" },
    { field: "dateOfBirth" },
    { field: "role" },
    { field: "board" },
    { field: "createdBy" },
    { field: "updatedBy" },
    { field: "teacherId" },
    { field: "groups" },
    { field: "educationalQualification" },
    { field: "schoolUdise" },
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
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
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

    const apiUrl = "https://alt.uniteframework.io/api/v1/teacher/search";
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
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        onCellClicked={cellClickedListener}
        pagination={true}
        // paginationAutoPageSize={true}
      ></AgGridReact>{" "}
    </div>
  );
}

export default TeacherListView;
