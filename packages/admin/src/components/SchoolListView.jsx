// export default listView;

import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { H4 } from "@shiksha/common-lib";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { schoolSearch } from "routes/links";

function SchoolListView() {
  const [token, setToken] = useState([]);

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
    { field: "board" },
    {
      field: "udiseCode",
      filter: true,
      filterParams: {
        defaultOption: "equals",
      },
    },

    { field: "location" },
    { field: "groups" },
    { field: "management" },
    { field: "composition" },

    { field: "mediumOfInstruction" },
    { field: "headmasterType" },
    { field: "headmasterMobile" },
    { field: "upperPrimaryTeachersSanctioned" },
    { field: "secondaryTeachersSanctioned" },
    { field: "libraryFunctional" },
    { field: "computerLabFunctional" },
    { field: "totalFunctionalComputers" },
    { field: "noOfBoysToilet" },
    { field: "noOfGirlsToilet" },
    { field: "smartBoardFunctionalClass6" },
    { field: "smartBoardFunctionalClass7" },
    { field: "smartBoardFunctionalClass8" },
    { field: "smartBoardFunctionalClass9" },
    { field: "smartBoardFunctionalClass10" },
    { field: "state" },
    { field: "district" },
    { field: "block" },
    { field: "adequateRoomsForEveryClass" },
    { field: "drinkingWaterSupply" },
    { field: "seperateToiletForGirlsAndBoys" },
    { field: "whetherToiletBeingUsed" },
    { field: "playgroundAvailable" },
    { field: "boundaryWallFence" },
    { field: "electricFittingsAreInsulated" },
    {
      field: "buildingIsResistantToEarthquakeFireFloodOtherCalamity",
    },
    { field: "buildingIsFreeFromInflammableAndToxicMaterials" },
    { field: "roofAndWallsAreInGoodCondition" },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event.data);
    localStorage.setItem("selectedRowData", JSON.stringify(event.data));
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  // const onBtnExportFields = useCallback(() => {
  //   // Extract only the "Name" and "Gender" fields
  //   const selectedFieldsData = rowData.map((row) => ({
  //     Name: row.Name,
  //     Gender: row.Gender,
  //   }));

  //   // Convert the data to CSV format using PapaParse
  //   const csvData = Papa.unparse(selectedFieldsData);

  //   // Create a Blob containing the CSV data
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  //   // Create a download link and trigger the download
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.download = "student_data_name_gender.csv";
  //   link.style.display = "none";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }, [rowData]);

  // useEffect for All school search

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const apiUrl = schoolSearch;
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
        {/* <button
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
      </button>  */}
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        animateRows={true}
        onCellClicked={cellClickedListener}
        pagination={true}
        paginationAutoPageSize={true}
        overlayNoRowsTemplate={'<span>Loading School records....</span>'}
      ></AgGridReact>{" "}
    </div>
  );
}

export default SchoolListView;
