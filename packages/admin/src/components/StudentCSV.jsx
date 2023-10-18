import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import studentBulkAPI from "api/studentBulkAPI";
import { Progress, Space } from "antd";
import Papa from 'papaparse';

function CSVImportForm() {
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const batchSize = 100; // Number of records per batch

  const [overallProgress, setOverallProgress] = useState(0);
  const [showSuccessCount, setShowSuccessCount] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // If loading is in progress, hide the success count
      setShowSuccessCount(false);
    } else {
      // Loading is finished, show the success count
      setShowSuccessCount(true);
    }
  }, [isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        setCSVData(result.data);
        console.log(result.data);
      },
      error: (error) => {
        console.error("CSV Parsing Error:", error);
      },
    });
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

    for (let i = startIndex; i < endIndex; i++) {
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
        setIsLoading(false);
       
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

    // Determine the number of full batches and the number of remaining records
    const numFullBatches = Math.floor(csvData.length / batchSize);
    const remainingRecords = csvData.length % batchSize;

    // Send full batches
    for (let i = 0; i < numFullBatches; i++) {
      const startIndex = i * batchSize;
      const endIndex = startIndex + batchSize;
      await sendBatch(startIndex, endIndex);
    }

    // Send remaining records if there are any
    if (remainingRecords > 0) {
      const startIndex = numFullBatches * batchSize;
      const endIndex = startIndex + remainingRecords;
      await sendBatch(startIndex, endIndex);
    }
    
    downloadCSVFromLocalStorage();
  };



  function downloadCSVFromLocalStorage() {
    // Retrieve and assemble student data from localStorage
    const studentData = [];
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("student_")) {
        const studentInfo = JSON.parse(localStorage.getItem(key));
        studentData.push(studentInfo);
      }
    }
  
    // Generate CSV data from studentData array
    const csvRows = studentData.map((student) =>
      `${student.username || ""},${student.schoolUdise || ""},${student.message || ""}`
    );
  
    const csvData = `Username,SchoolUdise,Error Message\n${csvRows.join("\n")}`;
  
    // Trigger CSV download
    downloadCSV(csvData, "Student_summary_report");
  }

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
<Button onPress={sendBatches} disabled={!csvData.length || isLoading}>
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

{showSuccessCount && (
        <div>Error Count: {localStorage.getItem("errorCount") || ""}</div>
      )}
    </div>
  );
}

export default CSVImportForm;
