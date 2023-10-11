import axios from "axios";
import { schoolRegister } from "../routes/links";

const schoolAPI = async (data) => {
  const token = sessionStorage.getItem('token');

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    udiseCode: data.udiseCode,
    name: data.name,
    location: data.location,
    management: data.management,
    composition: data.composition,
    board: data.board,
    mediumOfInstruction: [data.mediumOfInstruction],
    headmaster: data.headmaster,
    headmasterType: data.headmasterType,
    headmasterMobile: data.headmasterMobile,
    upperPrimaryTeachersSanctioned: data.upperPrimaryTeachersSanctioned,
    secondaryTeachersSanctioned: data.secondaryTeachersSanctioned,
    libraryFunctional: data.libraryFunctional,
    computerLabFunctional: data.computerLabFunctional,
    totalFunctionalComputers: data.totalFunctionalComputers,
    noOfBoysToilet: data.noOfBoysToilet,
    noOfGirlsToilet: data.noOfGirlsToilet,
    smartBoardFunctionalClass6: data.smartBoardFunctionalClass6,
    smartBoardFunctionalClass7: data.smartBoardFunctionalClass7,
    smartBoardFunctionalClass8: data.smartBoardFunctionalClass8,
    smartBoardFunctionalClass9: data.smartBoardFunctionalClass9,
    smartBoardFunctionalClass10: data.smartBoardFunctionalClass10,
    state: data.state,
    district: data.district,
    block: data.block,
    adequateRoomsForEveryClass: data.adequateRoomsForEveryClass,
    drinkingWaterSupply: data.drinkingWaterSupply,
    seperateToiletForGirlsAndBoys: data.seperateToiletForGirlsAndBoys,
    whetherToiletBeingUsed: data.whetherToiletBeingUsed,
    playgroundAvailable: data.playgroundAvailable,
    boundaryWallFence: data.boundaryWallFence,
    electricFittingsAreInsulated: data.electricFittingsAreInsulated,
    buildingIsResistantToEarthquakeFireFloodOtherCalamity:
      data.buildingIsResistantToEarthquakeFireFloodOtherCalamity,
    buildingIsFreeFromInflammableAndToxicMaterials:
      data.buildingIsFreeFromInflammableAndToxicMaterials,
    roofAndWallsAreInGoodCondition: data.roofAndWallsAreInGoodCondition,
  };

  let result = true;
  await axios({
    method: "POST",
    url: schoolRegister,
    data: jsonData,
    headers: headers,
  })
    .then((res) => {
      if (res.status === 201) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch(function (error) {
      let err = 0;
      return err;
    });

  return result;
};

export default schoolAPI;
