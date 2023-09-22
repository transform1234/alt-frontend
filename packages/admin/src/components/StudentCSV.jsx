import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import studentBulkAPI from "api/studentBulkAPI";

function CSVImportForm() {
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const batchSize = 100; // Number of records per batch

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split("\n");

      let headers = [];

      // Find the header row (row with the header names)
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "") {
          headers = lines[i].split(",");
          break;
        }
      }

      // Remove the trailing newline character from each line and then split into columns
      const data = lines.slice(1).map((line) => {
        const columns = line.replace(/\r$/, "").split(",");
        const studentObject = {};

        // Map columns to header names dynamically
        headers.forEach((header, index) => {
          studentObject[header] = columns[index] || "";
        });

        return studentObject;
      });

      setCSVData(data);
    };

    reader.readAsText(file);
  };

  const sendBatch = async (startIndex, endIndex) => {
    const batchData = csvData.slice(startIndex, endIndex);

    if (batchData.length === 0) {
      // No more data to send
      return;
    }

    setIsLoading(true);
    const requestData = {
      students: [],
    };

    for (let i = 0; i < csvData.length; i++) {
      const studentData = csvData[i];
      const studentObject = {
        name: studentData.name || "",
        username: studentData.username || "",
        email: studentData.email || "",
        mobile: studentData.mobile || "",
        gender: studentData.gender || "",
        dateOfBirth: studentData.dateOfBirth || "",
        board: studentData.board || "",
        password: studentData.password || "",
        status: studentData.status || "",
        className: studentData.className || "",
        groups: studentData.groups || [true],
        religion: studentData.religion || "",
        schoolUdise: studentData.school_udise || "",
        caste: studentData.caste || "",
        annualIncome: studentData.annual_income || 0,
        motherEducation: studentData.mother_education || "",
        fatherEducation: studentData.father_education || "",
        motherOccupation: studentData.mother_occupation || "",
        fatherOccupation: studentData.father_occupation || "",
        noOfSiblings: studentData.No_of_siblings || 0,
      };

      requestData.students.push(studentObject);
    }

    try {
      const result = await studentBulkAPI(requestData.students);
      console.log(`Batch ${startIndex + 1}-${endIndex} Data sent:`, result);

      // Update the current index for the next batch
      setCurrentIndex(endIndex);

      // Send the next batch if there is more data
      sendBatch(endIndex, endIndex + batchSize);
    } catch (error) {
      console.error("Error sending data:", error);
      setIsLoading(false);
    }
  };

  const sendBatches = async () => {
    if (csvData.length === 0) {
      return;
    }

    sendBatch(currentIndex, currentIndex + batchSize);
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
      </div>
    </div>
  );
}

export default CSVImportForm;
