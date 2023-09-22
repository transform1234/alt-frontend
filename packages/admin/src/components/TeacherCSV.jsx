import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import teacherBulkAPI from "api/teacherBulkAPI";

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
        name: teacherData["Name"] || "",
        username: teacherData.username || "",
        email: teacherData["Email Id"] || "",
        mobile: teacherData["Mobile"] || "",
        gender: teacherData["Gender"] || "",
        dateOfBirth: teacherData["DoB"] || "",
        board: teacherData["board"] || "",
        password: teacherData.password || "",
        status: teacherData.status || "",
        className: teacherData.className || "",
        groups: [teacherData["Classes taught"]] || [true],
        educationalQualification:
          teacherData["Educational Qualification"] || "",
        schoolUdise: teacherData.school_udise || 0,
        currentRole: teacherData["Current role"] || "",
        natureOfAppointment: teacherData["Nature of appointment"] || "",
        appointedPost: teacherData["Appointed Postname"] || "",
        totalTeachingExperience:
          teacherData["Total Experience in teaching"] || 0,
        totalHeadteacherExperience:
          teacherData["Total experience as Head Teacher"] || 0,
        coreSubjectTaught: teacherData["Core subject taught"] || 0,
        attendedInserviceTraining:
          teacherData["Attended In service teacher training"] || 0,
        lastTrainingAttendedTopic:
          teacherData["Last training attended (Topic)"] || 0,
        lastTrainingAttendedYear:
          teacherData["Last training attended (Year)"] || 0,
        trainedInComputerDigitalteaching:
          teacherData["Trained in use of computer & digital teaching"] || 0,
      };

      requestData.teachers.push(teacherObject);
    }

    try {
      const result = await teacherBulkAPI(requestData.teachers);
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
