import React, { useState } from "react";
import axios from "axios";
import { Button } from "native-base";
import { H2 } from "@shiksha/common-lib";
import schoolBulkAPI from "api/schoolBulkAPI";

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

      // Remove the trailing newline character from each line and then split into columns
      const data = lines.map((line) => line.replace(/\r$/, "").split(","));

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
  //     schools: [],
  //   };

  //   // Iterate through the parsed data starting from the second row (index 1)
  //   for (let i = 1; i < parsedData.length; i++) {
  //     const schoolData = parsedData[i];

  //     // Create a school object for each row and add it to the requestData.schools array
  //     const schoolObject = {
  //       name: schoolData[1],
  //       gender: schoolData[2],
  //       dob: schoolData[3],
  //       mobile: schoolData[4],
  //       school_udise: schoolData[5],
  //       grade: schoolData[6],
  //       religion: schoolData[7],
  //       email: schoolData[8] || "", // Use an empty string if email is missing
  //       caste: schoolData[9] || "", // Use an empty string if caste is missing
  //       annual_income: schoolData[10] || "", // Use an empty string if annual_income is missing
  //       mother_education: schoolData[11] || "", // Use an empty string if mother_education is missing
  //       father_education: schoolData[12] || "", // Use an empty string if father_education is missing
  //       mother_occupation: schoolData[13] || "", // Use an empty string if mother_occupation is missing
  //       father_occupation: schoolData[14] || "", // Use an empty string if father_occupation is missing
  //       No_of_siblings: schoolData[15] || 0, // Use 0 if No_of_siblings is missing
  //     };

  //     // Add the school object to the schools array
  //     requestData.schools.push(schoolObject);
  //   }

  //   try {
  //     // Convert the requestData object to JSON and send it as the request body
  //     const result = await schoolBulkAPI(
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
      schools: [],
    };

    // Iterate through the parsed data starting from the second row (index 1)
    for (let i = 1; i < csvData.length; i++) {
      const schoolData = csvData[i];

      // Create a school object for each row and add it to the requestData.schools array
      const schoolObject = {
        udiseCode: schoolData[1] || "",
        name: schoolData[2] || "",
        location: schoolData[3 || ""],
        management: schoolData[4] || "",
        composition: schoolData[5] || "",
        board: schoolData[6] || "",
        mediumOfInstruction: [schoolData[7]] || [""],
        headmaster: schoolData[8] || "",
        headmasterType: schoolData[9] || "",
        headmasterMobile: schoolData[10] || "",
        upperPrimaryTeachersSanctioned: schoolData[11] || 0,
        secondaryTeachersSanctioned: schoolData[12] || 0,
        libraryFunctional: schoolData[13] || "",
        computerLabFunctional: schoolData[14] || "",
        totalFunctionalComputers: schoolData[15] || 0, // Use an empty string if annual_income is missing
        noOfBoysToilet: schoolData[16] || 0, // Use an empty string if mother_education is missing
        noOfGirlsToilet: schoolData[17] || 0, // Use an empty string if father_education is missing
        smartBoardFunctionalClass6: schoolData[18] || "", // Use an empty string if mother_occupation is missing
        smartBoardFunctionalClass7: schoolData[19] || "", // Use an empty string if father_occupation is missing
        smartBoardFunctionalClass8: schoolData[20] || 0, // Use 0 if No_of_siblings is missing
        smartBoardFunctionalClass9: schoolData[21] || 0,
        smartBoardFunctionalClass10: schoolData[22] || 0,
        state: schoolData[23] || 0,
        district: schoolData[24] || 0,
        block: schoolData[25] || 0,
        adequateRoomsForEveryClass: schoolData[26] || 0,
        drinkingWaterSupply: schoolData[27] || 0,
        seperateToiletForGirlsAndBoys: schoolData[28] || 0,
        whetherToiletBeingUsed: schoolData[29] || 0,
        playgroundAvailable: schoolData[30] || 0,
        boundaryWallFence: schoolData[31] || 0,
        electricFittingsAreInsulated: schoolData[32] || 0,
        buildingIsResistantToEarthquakeFireFloodOtherCalamity:
          schoolData[33] || 0,
        buildingIsFreeFromInflammableAndToxicMaterials: schoolData[34] || 0,
        roofAndWallsAreInGoodCondition: schoolData[35] || 0,
      };

      // Add the school object to the schools array
      requestData.schools.push(schoolObject);
    }

    try {
      // Convert the requestData object to JSON and send it as the request body
      const result = await schoolBulkAPI(
        requestData.schools // Send the formatted request data
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
