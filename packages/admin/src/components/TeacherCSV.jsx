import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import teacherBulkAPI from "api/teacherBulkAPI";
import { useNavigate } from "react-router-dom";

function CSVImportForm() {
  const [csvData, setCSVData] = useState([]);
  const navigate = useNavigate();
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
        const teacherObject = {};

        // Map columns to header names dynamically
        headers.forEach((header, index) => {
          teacherObject[header] = columns[index] || "";
        });

        return teacherObject;
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
      teachers: [],
    };

    for (let i = 0; i < csvData.length; i++) {
      const teacherData = csvData[i];
      const teacherObject = {
        name: teacherData["Name"] || null,
        username: null,
        email: teacherData["Email Id"] || null,
        mobile: teacherData["Mobile"] || null,
        gender: teacherData["Gender"] || null,
        dateOfBirth: teacherData["DoB"] || null,
        board: teacherData["board"] || null,
        password: null,
        status: teacherData["Status"] || null,
        groups: [],
        educationalQualification:
          teacherData["Educational Qualification"] || null,
        schoolUdise: teacherData["School Udise"] || null,
        currentRole: teacherData["Current role"] || null,
        natureOfAppointment: teacherData["Nature of appointment"] || null,
        appointedPost: teacherData["Appointed Postname"] || null,
        totalTeachingExperience:
          teacherData["Total Experience in teaching"] || null,
        totalHeadteacherExperience:
          teacherData["Total experience as Head Teacher"] || null,
        classesTaught: teacherData["Classes taught"] || null,
        coreSubjectTaught: teacherData["Core subject taught"] || null,
        attendedInserviceTraining:
          teacherData["Attended In service teacher training"] || null,
        lastTrainingAttendedTopic:
          teacherData["Last training attended (Topic)"] || null,
        lastTrainingAttendedYear:
          teacherData["Last training attended (Year)"] || null,
        trainedInComputerDigitalteaching:
          teacherData["Trained in use of computer & digital teaching"] || null,
      };

      requestData.teachers.push(teacherObject);
    }

    try {
      const result = await teacherBulkAPI(requestData.teachers);
      console.log(`Batch ${startIndex + 1}-${endIndex} Data sent:`, result);
      if (result == true) {
        let successCount = localStorage.getItem("successCount");
        alert("Upload Successful.\nSuccess count: " + successCount);
      } else {
        alert("Upload failed");
      }

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
