import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import { useEffect } from "react";
import studentBulkAPI from "api/studentBulkAPI";

function CSVImportForm() {
  const [selectedUdiseCode, setSelectedUdiseCode] = useState(0);
  const [selectedgroup, setSelectedgroup] = useState("");
  const [selectedpassword, setSelectedpassword] = useState("");

  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const batchSize = 1; // Number of records per batch

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
        groups: [] || [true],
        religion: studentData[11] || "",
        schoolUdise: studentData[12] || "",
        caste: studentData[13] || "",
        annualIncome: studentData[14] || 0, // Use an empty string if annual_income is missing
        motherEducation: studentData[15] || "", // Use an empty string if mother_education is missing
        fatherEducation: studentData[16] || "", // Use an empty string if father_education is missing
        motherOccupation: studentData[17] || "", // Use an empty string if mother_occupation is missing
        fatherOccupation: studentData[18] || "", // Use an empty string if father_occupation is missing
        noOfSiblings: 5 || 0, // Use 0 if No_of_siblings is missing
      };

      // Add the student object to the students array
      requestData.students.push(studentObject);
    }

    try {
      // Convert the requestData object to JSON and send it as the request body
      const result = await studentBulkAPI(
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
      <div style={{ marginBottom: "10px" }}>
        <H2>Click on Upload CSV to Submit</H2>
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
