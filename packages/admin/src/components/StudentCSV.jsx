import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import { useEffect } from "react";
import studentBulkAPI from "api/studentBulkAPI";

function CSVImportForm() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState([]);
  const [selectedUdiseCode, setSelectedUdiseCode] = useState(0);
  const [selectedgroup, setSelectedgroup] = useState("");
  const [selectedpassword, setSelectedpassword] = useState("");
  const [groups, setGroups] = useState([]);

  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const batchSize = 1; // Number of records per batch

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    console.log("FIRST useEffect");
    console.log(token);
  }, []);

  useEffect(() => {
    console.log("Second useEffect");
    console.log(token);

    const apiUrl = "https://alt.uniteframework.io/api/v1/school/search";
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      limit: "20",
      page: 0,
      filters: {},
    };

    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        console.log("SCHOOL DATA USE EFFECT");
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [token]);

  useEffect(() => {
    console.log("Group useEffect");
    console.log(token);
    console.log(selectedUdiseCode);

    const groupapiUrl = "https://alt.uniteframework.io/api/v1/group/search";
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      limit: 20,
      page: 0,
      filters: {
        schoolUdise: {
          eq: selectedUdiseCode,
        },
      },
    };

    axios
      .post(groupapiUrl, requestData, { headers })
      .then((response) => {
        console.log("Group DATA USE EFFECT");
        console.log(response.data.data);
        setGroups(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [selectedUdiseCode]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split("\n");
      const data = lines.map((line) => line.split(","));
      setCSVData(data);
    };

    reader.readAsText(file);
  };

  // const sendBatches = async () => {
  //   setIsLoading(true);

  //   // Create an object to hold the request data
  //   const requestData = {
  //     schoolUdise: selectedUdiseCode,
  //     groupId: selectedgroup,
  //     password: selectedpassword,
  //     students: [],
  //   };

  //   // Iterate through the parsed data starting from the second row (index 1)
  //   for (let i = 1; i < parsedData.length; i++) {
  //     const studentData = parsedData[i];

  //     // Create a student object for each row and add it to the requestData.students array
  //     const studentObject = {
  //       name: studentData[1],
  //       gender: studentData[2],
  //       dob: studentData[3],
  //       mobile: studentData[4],
  //       school_udise: studentData[5],
  //       grade: studentData[6],
  //       religion: studentData[7],
  //       email: studentData[8] || "", // Use an empty string if email is missing
  //       caste: studentData[9] || "", // Use an empty string if caste is missing
  //       annual_income: studentData[10] || "", // Use an empty string if annual_income is missing
  //       mother_education: studentData[11] || "", // Use an empty string if mother_education is missing
  //       father_education: studentData[12] || "", // Use an empty string if father_education is missing
  //       mother_occupation: studentData[13] || "", // Use an empty string if mother_occupation is missing
  //       father_occupation: studentData[14] || "", // Use an empty string if father_occupation is missing
  //       No_of_siblings: studentData[15] || 0, // Use 0 if No_of_siblings is missing
  //     };

  //     // Add the student object to the students array
  //     requestData.students.push(studentObject);
  //   }

  //   try {
  //     // Convert the requestData object to JSON and send it as the request body
  //     const result = await studentBulkAPI(
  //       requestData // Send the formatted request data
  //     );
  //     console.log("Data sent:", result);
  //     // Optionally, you can update your database here with the response data
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }

  //   setIsLoading(false);
  // };

  const sendBatches = async () => {
    setIsLoading(true);

    // Create an object to hold the request data
    const requestData = {
      schoolUdise: selectedUdiseCode,
      groupId: selectedgroup,
      password: selectedpassword,
      students: [],
    };

    // Iterate through the parsed data starting from the second row (index 1)
    for (let i = 1; i < csvData.length; i++) {
      const studentData = csvData[i];

      // Create a student object for each row and add it to the requestData.students array
      const studentObject = {
        name: studentData[1] || "",
        username: studentData[2] || "",
        email: studentData[3 || ""],
        mobile: studentData[4] || "",
        gender: studentData[5] || "",
        dateOfBirth: studentData[6] || "",
        board: studentData[7] || "",
        password: studentData[8] || "",
        status: studentData[9] || "",
        groups: studentData[10] || "",
        religion: studentData[11] || "",
        schoolUdise: studentData[12] || "",
        caste: studentData[13] || "",
        annualIncome: studentData[14] || 0, // Use an empty string if annual_income is missing
        motherEducation: studentData[15] || "", // Use an empty string if mother_education is missing
        fatherEducation: studentData[16] || "", // Use an empty string if father_education is missing
        motherOccupation: studentData[17] || "", // Use an empty string if mother_occupation is missing
        fatherOccupation: studentData[18] || "", // Use an empty string if father_occupation is missing
        noOfSiblings: studentData[19] || 0, // Use 0 if No_of_siblings is missing
      };

      // Add the student object to the students array
      requestData.students.push(studentObject);
    }

    try {
      // Convert the requestData object to JSON and send it as the request body
      const result = await studentBulkAPI(
        requestData.schoolUdise,
        requestData.groupId,
        requestData.password,
        requestData.students // Send the formatted request data
      );
      console.log("Data sent:", result);
      // Optionally, you can update your database here with the response data
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div>
        {/* ... (previous form elements) */}
        <div className="form-floating">
          <select
            name="udise"
            id="udise"
            value={selectedUdiseCode}
            onChange={(e) => setSelectedUdiseCode(e.target.value)}
          >
            <option value="">Select School Udise</option>{" "}
            {/* Placeholder option */}
            {data.map((school) => (
              <option key={school.udiseCode} value={school.udiseCode}>
                {school.udiseCode}
              </option>
            ))}
          </select>
        </div>
        {/* ... (more form elements) */}
      </div>
      <br></br>

      <div>
        {/* ... (previous form elements) */}
        <div className="form-floating">
          <select
            name="group"
            id="group"
            value={selectedgroup}
            onChange={(e) => setSelectedgroup(e.target.value)}
          >
            <option value="">Select Group</option> {/* Placeholder option */}
            {groups.map((school) => (
              <option key={school.groupId} value={school.groupId}>
                {school.groupId}
              </option>
            ))}
          </select>

          {/* <label className="form-label" htmlFor="udise">
                  Group
                </label> */}
        </div>
        {/* ... (more form elements) */}
      </div>

      <br></br>

      <div className="form-check">
        <input
          className="form-check-input"
          type="text"
          name="gender"
          id="gender"
          value={selectedpassword}
          onChange={(e) => setSelectedpassword(e.target.value)}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          Password
        </label>
      </div>

      <br></br>

      <div style={{ marginBottom: "10px" }}>
        <H2>
          Select a File by clicking on Browse and Click on Upload CSV to Submit
        </H2>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <Button onPress={sendBatches} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload CSV"}
        </Button>
        {/* 
        <Button
          onClick={sendBatches}
          disabled={isLoading}
          style={{ marginLeft: "10px" }}
        >
          Download Template
        </Button> */}
      </div>
    </div>
  );
}

export default CSVImportForm;
