import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import schoolBulkAPI from "api/schoolBulkAPI";
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
        const schoolObject = {};

        // Map columns to header names dynamically
        headers.forEach((header, index) => {
          schoolObject[header] = columns[index] || "";
        });

        return schoolObject;
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
      schools: [],
    };

    for (let i = 0; i < csvData.length; i++) {
      const schoolData = csvData[i];
      const schoolObject = {
        udiseCode: schoolData["School UDISE code"] || null,
        name: schoolData["School Name"] || null,
        location: schoolData["Location"] || null,
        management: schoolData["School Management"] || null,
        composition: schoolData["School Composition"] || null,
        board: schoolData["Board"] || null,
        mediumOfInstruction: [schoolData["Medium of Instruction"]] || [],
        headmaster: schoolData["Head Master"] || null,
        headmasterType: schoolData["Headmaster Type"] || null,
        headmasterMobile: schoolData["Headmaster Mobile"] || null,
        upperPrimaryTeachersSanctioned:
          parseInt(
            schoolData["Number of teachers sanctioned -Upper Primary"]
          ) || 0,
        secondaryTeachersSanctioned:
          parseInt(schoolData["Number of teachers sanctioned -Secondary"]) || 0,
        libraryFunctional: schoolData["Library Functional"] || null,
        computerLabFunctional: schoolData["Computer Lab functional"] || null,
        totalFunctionalComputers:
          parseInt(schoolData["Number of functional computers"]) || 0,
        noOfBoysToilet: parseInt(schoolData["Number of Boys toilet"]) || 0,
        noOfGirlsToilet: parseInt(schoolData["Number of Girls toilet"]) || 0,
        smartBoardFunctionalClass6:
          schoolData["Smart Board functional in Class 6"] || null,
        smartBoardFunctionalClass7:
          schoolData["Smart Board functional in Class 7"] || null,
        smartBoardFunctionalClass8:
          schoolData["Smart Board functional in Class 8"] || null,
        smartBoardFunctionalClass9:
          schoolData["Smart Board functional in Class 9"] || null,
        smartBoardFunctionalClass10:
          schoolData["Smart Board functional in Class 10"] || null,
        state: schoolData["State"] || null,
        district: schoolData["District"] || null,
        block: schoolData["Block"] || null,
        adequateRoomsForEveryClass:
          schoolData["Adequate Rooms For EveryClass"] || false,
        drinkingWaterSupply: schoolData["Drinking Water Supply"] || false,
        seperateToiletForGirlsAndBoys:
          schoolData["Separate Toilet For Girls And Boys"] || false,
        whetherToiletBeingUsed:
          schoolData["Whether Toilet Being Used"] || false,
        playgroundAvailable: schoolData["Playground Available"] || false,
        boundaryWallFence: schoolData["Boundary Wall Fence"] || false,
        electricFittingsAreInsulated:
          schoolData["Electric Fittings Are Insulated"] || false,
        buildingIsResistantToEarthquakeFireFloodOtherCalamity:
          schoolData[
            "Building Is Resistant To Earthquake Fire Flood Other Calamity"
          ] || false,
        buildingIsFreeFromInflammableAndToxicMaterials:
          schoolData["Building Is Free From Inflammable And Toxic Materials"] ||
          false,
        roofAndWallsAreInGoodCondition:
          schoolData["Roof And Walls Are In Good Condition"] || false,
      };

      requestData.schools.push(schoolObject);
    }

    try {
      const result = await schoolBulkAPI(requestData.schools);
      if (result === true) {
        let names = localStorage.getItem("bulkErrorsNames") || "";
        let errorMessage = localStorage.getItem("errorMessage") || "";
        setIsLoading(false);
        const csvData = `Names of Failed Schools,Error Message\n${names},${errorMessage}`;

        // Trigger CSV download
        downloadCSV(csvData, "School_summary_report");
      } else {
        alert("Upload failed");
        setIsLoading(false);
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
