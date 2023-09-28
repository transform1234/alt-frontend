import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import studentBulkAPI from "api/studentBulkAPI";
import { Progress, Space } from "antd";

function CSVImportForm() {
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const batchSize = 100; // Number of records per batch

  const [overallProgress, setOverallProgress] = useState(0);
  const [showSuccessCount, setShowSuccessCount] = useState(false);
  const [showBulkErrors, setShowBulkErrors] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // If loading is in progress, hide the success count
      setShowSuccessCount(false);
      setShowBulkErrors(false);
    } else {
      // Loading is finished, show the success count
      setShowSuccessCount(true);
      setShowBulkErrors(true);
    }
  }, [isLoading]);

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
      if (studentData["name"] && studentData["name"].trim() !== "") {
        const studentObject = {
          name: studentData["name"] || null,
          username: null,
          email: studentData["email"] || null,
          mobile: studentData["mobile"] || null,
          gender: studentData["gender"] || null,
          dateOfBirth: studentData["dateOfBirth"] || null,
          board: studentData["board"] || null,
          password: null,
          status: studentData["status"] || null,
          className: studentData["className"] || null,
          groups: [],
          religion: studentData["religion"] || null,
          schoolUdise: studentData["school_udise"] || null,
          caste: studentData["caste"] || null,
          annualIncome: studentData["annual_income"] || null,
          motherEducation: studentData["mother_education"] || null,
          fatherEducation: studentData["father_education"] || null,
          motherOccupation: studentData["mother_occupation"] || null,
          fatherOccupation: studentData["father_occupation"] || null,
          noOfSiblings: studentData["No_of_siblings"] || 0,
        };

        requestData.students.push(studentObject);
      }
    }
    try {
      const result = await studentBulkAPI(requestData.students);

      if (result === true) {
        let names = localStorage.getItem("bulkErrorsNames") || "";
        let errorMessage = localStorage.getItem("errorMessage") || "";
        setIsLoading(false);
        const csvData = `Names of Failed Students,Error Message\n${names},${errorMessage}`;

        // Trigger CSV download
        downloadCSV(csvData, "Student_summary_report");
      } else {
        setIsLoading(false);
        alert("Upload failed");
      }

      console.log(`Batch ${startIndex + 1}-${endIndex} Data sent:`, result);

      // Update the current index for the next batch
      setCurrentIndex(endIndex);

      // Send the next batch if there is more data
      sendBatch(endIndex, endIndex + batchSize);
    } catch (error) {
      console.error("Error sending data:", error);
      setIsLoading(false);
    }
    const batchProgress = ((endIndex + 1) / csvData.length) * 100;
    setOverallProgress(batchProgress);
  };

  const sendBatches = async () => {
    if (csvData.length === 0) {
      return;
    }

    sendBatch(currentIndex, currentIndex + batchSize);
  };

  function downloadCSV(data, filename) {
    const csvContent =
      "data:text/csv;charset=utf-8," + encodeURIComponent(data);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <H2>Click on Upload CSV to Submit</H2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "25px",
          marginTop: "15px",
        }}
      >
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <Button onPress={sendBatches} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload CSV"}
        </Button>
      </div>
      <div>
        <Progress
          strokeLinecap="butt"
          percent={overallProgress}
          format={(percent) => `${percent.toFixed(2)}%`}
        />
      </div>
      {showSuccessCount && (
        <div>Success Count: {localStorage.getItem("successCount") || ""}</div>
      )}
      {showBulkErrors && (
        <div>Error Count: {localStorage.getItem("bulkErrors") || ""}</div>
      )}
    </div>
  );
}

export default CSVImportForm;
