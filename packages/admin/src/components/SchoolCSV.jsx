import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import schoolBulkAPI from "api/schoolBulkAPI";

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
        udiseCode: schoolData.udiseCode || "",
        name: schoolData.name || "",
        location: schoolData.location || "",
        management: schoolData.management || "",
        composition: schoolData.composition || "",
        board: schoolData.board || "",
        mediumOfInstruction: [schoolData.mediumOfInstruction] || [""],
        headmaster: schoolData.headmaster || "",
        headmasterType: schoolData.headmasterType || "",
        headmasterMobile: schoolData.headmasterMobile || "",
        upperPrimaryTeachersSanctioned:
          schoolData.upperPrimaryTeachersSanctioned || 0,
        secondaryTeachersSanctioned:
          schoolData.secondaryTeachersSanctioned || 0,
        libraryFunctional: schoolData.libraryFunctional || "",
        computerLabFunctional: schoolData.computerLabFunctional || "",
        totalFunctionalComputers: schoolData.totalFunctionalComputers || 0,
        noOfBoysToilet: schoolData.noOfBoysToilet || 0,
        noOfGirlsToilet: schoolData.noOfGirlsToilet || 0,
        smartBoardFunctionalClass6: schoolData.smartBoardFunctionalClass6 || "",
        smartBoardFunctionalClass7: schoolData.smartBoardFunctionalClass7 || "",
        smartBoardFunctionalClass8: schoolData.smartBoardFunctionalClass8 || "",
        smartBoardFunctionalClass9: schoolData.smartBoardFunctionalClass9 || "",
        smartBoardFunctionalClass10:
          schoolData.smartBoardFunctionalClass10 || "",
        state: schoolData.state || "",
        district: schoolData.district || "",
        block: schoolData.block || "",
        adequateRoomsForEveryClass:
          schoolData.adequateRoomsForEveryClass || false,
        drinkingWaterSupply: schoolData.drinkingWaterSupply || false,
        seperateToiletForGirlsAndBoys:
          schoolData.seperateToiletForGirlsAndBoys || false,
        whetherToiletBeingUsed: schoolData.whetherToiletBeingUsed || false,
        playgroundAvailable: schoolData.playgroundAvailable || false,
        boundaryWallFence: schoolData.boundaryWallFence || false,
        electricFittingsAreInsulated:
          schoolData.electricFittingsAreInsulated || false,
        buildingIsResistantToEarthquakeFireFloodOtherCalamity:
          schoolData.buildingIsResistantToEarthquakeFireFloodOtherCalamity ||
          false,
        buildingIsFreeFromInflammableAndToxicMaterials:
          schoolData.buildingIsFreeFromInflammableAndToxicMaterials || false,
        roofAndWallsAreInGoodCondition:
          schoolData.roofAndWallsAreInGoodCondition || false,
      };

      requestData.schools.push(schoolObject);
    }

    try {
      const result = await schoolBulkAPI(requestData.schools);
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
