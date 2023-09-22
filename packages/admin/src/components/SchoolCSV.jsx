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
        udiseCode: schoolData["School UDISE code"] || "",
        name: schoolData["School Name"] || "",
        location: schoolData["Location"] || "",
        management: schoolData["School Management"] || "",
        composition: schoolData["School Composition"] || "",
        board: schoolData["Board"] || "",
        mediumOfInstruction: [schoolData["Medium of Instruction"]] || [],
        headmaster: schoolData["Head Master"] || "",
        headmasterType: schoolData["Headmaster Type"] || "",
        headmasterMobile: schoolData["Headmaster Mobile"] || "",
        upperPrimaryTeachersSanctioned:
          parseInt(
            schoolData["Number of teachers sanctioned -Upper Primary"]
          ) || 0,
        secondaryTeachersSanctioned:
          parseInt(schoolData["Number of teachers sanctioned -Secondary"]) || 0,
        libraryFunctional: schoolData["Library Functional"] || "",
        computerLabFunctional: schoolData["Computer Lab functional"] || "",
        totalFunctionalComputers:
          parseInt(schoolData["Number of functional computers"]) || 0,
        noOfBoysToilet: parseInt(schoolData["Number of Boys toilet"]) || 0,
        noOfGirlsToilet: parseInt(schoolData["Number of Girls toilet"]) || 0,
        smartBoardFunctionalClass6:
          schoolData["Smart Board functional in Class 6"] || "",
        smartBoardFunctionalClass7:
          schoolData["Smart Board functional in Class 7"] || "",
        smartBoardFunctionalClass8:
          schoolData["Smart Board functional in Class 8"] || "",
        smartBoardFunctionalClass9:
          schoolData["Smart Board functional in Class 9"] || "",
        smartBoardFunctionalClass10:
          schoolData["Smart Board functional in Class 10"] || "",
        state: schoolData["State"] || "",
        district: schoolData["District"] || "",
        block: schoolData["Block"] || "",
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
