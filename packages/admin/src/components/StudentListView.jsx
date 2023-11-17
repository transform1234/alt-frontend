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
import useSWR from 'swr';
import { studentSearch } from "routes/links";
import { Button } from "native-base";
import { result } from "lodash";
import studentUsernamePasswordAPI from "api/studentUsernamePasswordAPI";

function StudentListView() {
  const [token, setToken] = useState([]);
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);


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
    { field: "dateOfBirth", width: 150 },
    { field: "board", width: 150 },
    { field: "schoolName", width: 250 },
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

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const onBtnExportFields = async() => {

    let person = window.prompt(
      `Enter a School Udise`
    );
    if (person == null || person == "") {
      alert("Please enter a valid password");
    } else {
      console.log(person)
    
     
      const result = await studentUsernamePasswordAPI(person);
      if (result) {
        
        const filteredData = result.data.data;
        console.log(filteredData);

    const selectedFieldsData = filteredData.map((row) => ({
      Name: row.name,
      UserName: row.username,
      Password: row.password,
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



    useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  // Fetching data using useSWR
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const requestData = {
          limit: "5",
          page: 1,
          filters: {},
        };

        const response = await axios.post(studentSearch, requestData, { headers });
        setRowData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);


  const handlePaginationChanged = () => {
    // Increment the current page when the "Next Page" button is clicked
   console.log('clicked');

   const fetchData = async () => {
    try {
      const headers = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestData = {
        limit: "5",
        page: currentPage,
        filters: {},
      };

      const response = await axios.post(studentSearch, requestData, { headers });
      setRowData(response.data.data);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
    
  };


  const handlePaginationChanged2 = () => {
    // Increment the current page when the "Next Page" button is clicked
   console.log('clicked');

   const fetchData = async () => {
    try {
      const headers = {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const requestData = {
        limit: "5",
        page: currentPage,
        filters: {},
      };

      const response = await axios.post(studentSearch, requestData, { headers });
      setRowData(response.data.data);
      setCurrentPage(currentPage - 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
    
  };
  

  return (
    <div className="ag-theme-material" style={{ height: 400, width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
      
        <button
          onClick={onBtnExportFields}
          style={{
            background: "#41C88E",
            border: "none",
            borderRadius: "5px",
            marginLeft: "10px", // Add some spacing between the buttons
            display: "flex", // Center align vertically
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
          <H4 style={{ color: "white" }}> Download username & password </H4>
        </button>
</div>
      <div style={{display: "flex", flexDirection: "row",justifyContent: "flex-end", paddingBottom: "10px", cursor: "pointer", zIndex: "1"}}>
      <Button style={{cursor: "pointer"}}
      onPress={handlePaginationChanged}>Previous Page</Button>
      <Button style={{cursor: "pointer", marginLeft:"20px"}}
      onPress={handlePaginationChanged2}>Next Page</Button>
    
      </div>
      
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellClicked={cellClickedListener}
        overlayNoRowsTemplate={'<span>Loading Student records....</span>'}
        
      ></AgGridReact>{" "}

     
    </div>
  );
}

export default StudentListView;