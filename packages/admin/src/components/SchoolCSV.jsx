import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";

function SchoolCSV() {
  const [csvData, setCSVData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const batchSize = 5; // Number of records per batch

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

  const sendBatches = async () => {
    setIsLoading(true); // Set loading state

    for (let i = 0; i < csvData.length; i += batchSize) {
      const batch = csvData.slice(i, i + batchSize);
      try {
        // Send batch of records to the backend using Axios
        // const response = await axios.post("your-backend-api-endpoint", batch);
        console.log("Batch sent:", batch);
        // console.log("Response:", response.data); // Assuming the response contains relevant info

        // Optionally, you can update your database here with the response data
      } catch (error) {
        console.error("Error sending batch:", error);
      }
    }

    setIsLoading(false); // Reset loading state after sending batches
  };

  return (
    <div>
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

export default SchoolCSV;
