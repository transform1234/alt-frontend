import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import SchoolSchema from "schema/SchoolSchema";
import styles from "./StudentForm.module.css";
import schoolAPI from "api/schoolAPI";

function SchoolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SchoolSchema) });
  // } = useForm();
  console.log(errors);
  const onSubmit = async (data) => {
    const result = await schoolAPI(data);
    // console.log(result, "data");
    if (result == true) {
      alert("Added Successful");
    } else {
      alert("Failed");
    }
  };

  return (
    <div>
      <form
        className=" card-body form-floating mt-3 mx-1"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <div className="container mb-3">
            <div style={{ marginBottom: "10px" }}>
              <H2>
                Interact with the requisite fields and execute a "Submit" action
                to preserve your alterations.
              </H2>
            </div>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="udiseCode"
                id="udiseCode"
                placeholder="School Udise"
                {...register("udiseCode")}
              ></input>
              {/* <label className="form-label" htmlFor="udiseCode">
                Name
              </label> */}
              {errors.udiseCode && <p>{errors.udiseCode.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="name"
                id="name"
                placeholder="School Name"
                {...register("name")}
              ></input>
              {/* <label className="form-label" htmlFor="name">
                Name
              </label> */}
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <label classlocation="form-label" htmlFor="location">
                Location
              </label>
              <select
                className={styles.formControl}
                {...register("location")}
                placeholder="Location"
              >
                <option value=""> Select 1 option</option>

                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
              </select>
              {/* <input
                className={styles.formControl}
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                {...register("location")}
              ></input> */}
              {errors.location && <p>{errors.location.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <label classlocation="form-label" htmlFor="management">
                School management
              </label>
              <select
                className={styles.formControl}
                {...register("management")}
                placeholder="Management"
              >
                <option value=""> Select 1 option</option>

                <option value="Government_Aided">Government_Aided</option>
                <option value="Local_Bodies">Local_Bodies</option>
                <option value="Private_Unaided">Private_Unaided</option>
                <option value="State_Government">State_Government</option>
                <option value="Tribal">Tribal</option>
                <option value="Others">Others</option>
              </select>

              {errors.management && <p>{errors.management.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <label classlocation="form-label" htmlFor="composition">
                School composition
              </label>
              <select
                className={styles.formControl}
                {...register("composition")}
                placeholder="Composition"
              >
                <option value=""> Select 1 option</option>

                <option value="Boys">Boys</option>
                <option value="CoEducation">CoEducation</option>
                <option value="Girls">Girls</option>
              </select>

              {/* <label classcomposition="form-label" htmlFor="composition">
                composition
              </label> */}
              {errors.composition && <p>{errors.composition.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="board"
                id="board"
                placeholder="Board"
                {...register("board")}
              ></input>
              {/* <label classboard="form-label" htmlFor="board">
                board
              </label> */}
              <div className={styles.errorMessage}>
                {errors.board && <p>{errors.board.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="mediumOfInstruction"
                id="mediumOfInstruction"
                placeholder="Medium Of Instruction"
                {...register("mediumOfInstruction")}
              ></input>
              {/* <label classmediumOfInstruction="form-label" htmlFor="mediumOfInstruction">
                mediumOfInstruction
              </label> */}
              {errors.mediumOfInstruction && (
                <p>{errors.mediumOfInstruction.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="headmaster"
                id="headmaster"
                placeholder="Headmaster"
                {...register("headmaster")}
              ></input>
              {/* <label classheadmaster="form-label" htmlFor="headmaster">
                headmaster
              </label> */}
              {errors.headmaster && <p>{errors.headmaster.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="headmasterMobile"
                id="headmasterMobile"
                placeholder="Headmaster Mobile"
                {...register("headmasterMobile")}
              ></input>
              {/* <label classheadmasterMobile="form-label" htmlFor="headmasterMobile">
                headmasterMobile
              </label> */}
              {errors.headmasterMobile && (
                <p>{errors.headmasterMobile.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <label classlocation="form-label" htmlFor="headmasterType">
                Headmaster Type
              </label>
              <select
                className={styles.formControl}
                {...register("headmasterType")}
                placeholder="HeadmasterType"
              >
                <option value=""> Select 1 option</option>

                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
              </select>

              {/* <label classheadmasterType="form-label" htmlFor="headmasterType">
                headmasterType
              </label> */}
              {errors.headmasterType && <p>{errors.headmasterType.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="number"
                name="upperPrimaryTeachersSanctioned"
                id="upperPrimaryTeachersSanctioned"
                placeholder="Upper Primary Teachers Sanctioned"
                {...register("upperPrimaryTeachersSanctioned")}
              ></input>
              {/* <label classupperPrimaryTeachersSanctioned="form-label" htmlFor="upperPrimaryTeachersSanctioned">
                upperPrimaryTeachersSanctioned
              </label> */}
              {errors.upperPrimaryTeachersSanctioned && (
                <p>{errors.upperPrimaryTeachersSanctioned.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="number"
                name="secondaryTeachersSanctioned"
                id="secondaryTeachersSanctioned"
                placeholder="Secondary Teachers Sanctioned"
                {...register("secondaryTeachersSanctioned")}
              ></input>
              {/* <label classsecondaryTeachersSanctioned="form-label" htmlFor="secondaryTeachersSanctioned">
                secondaryTeachersSanctioned
              </label> */}
              {errors.secondaryTeachersSanctioned && (
                <p>{errors.secondaryTeachersSanctioned.message}</p>
              )}
            </div>
            <br></br>
            <label>Library Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="libraryFunctional"
                  id="libraryFunctional"
                  value="true"
                  checked
                  {...register("libraryFunctional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="libraryFunctional"
                  id="libraryFunctional"
                  value="false"
                  {...register("libraryFunctional")}
                />
                <label className="form-check-label" htmlFor="libraryFunctional">
                  No
                </label>
              </div>
            </div>
            <br></br>
            {/* <label>Computer Lab Functional</label> */}
            <div className="form-check">
              <label classlocation="form-label" htmlFor="computerLabFunctional">
                Computer Lab Functional
              </label>
              <select
                className={styles.formControl}
                {...register("computerLabFunctional")}
                placeholder="computerLabFunctional"
              >
                <option value=""> Select 1 option</option>

                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {errors.computerLabFunctional && (
              <p>{errors.computerLabFunctional.message}</p>
            )}
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="number"
                name="totalFunctionalComputers"
                id="totalFunctionalComputers"
                placeholder="Total Functional Computers"
                {...register("totalFunctionalComputers")}
              ></input>
              {/* <label classtotalFunctionalComputers="form-label" htmlFor="totalFunctionalComputers">
                totalFunctionalComputers
              </label> */}
              {errors.totalFunctionalComputers && (
                <p>{errors.totalFunctionalComputers.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="number"
                name="noOfBoysToilet"
                id="noOfBoysToilet"
                placeholder="Number Of Boys Toilet"
                {...register("noOfBoysToilet")}
              ></input>
              {/* <label classnoOfBoysToilet="form-label" htmlFor="noOfBoysToilet">
                noOfBoysToilet
              </label> */}
              {errors.noOfBoysToilet && <p>{errors.noOfBoysToilet.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="number"
                name="noOfGirlsToilet"
                id="noOfGirlsToilet"
                placeholder="Number Of Girls Toilet"
                {...register("noOfGirlsToilet")}
              ></input>
              {/* <label classnoOfGirlsToilet="form-label" htmlFor="noOfGirlsToilet">
                noOfGirlsToilet
              </label> */}
              {errors.noOfGirlsToilet && (
                <p>{errors.noOfGirlsToilet.message}</p>
              )}
            </div>
            <br></br>
            <br></br>
            {/* <label>Smart Board Functional Class 6</label> */}
            <div className="form-check">
              <label
                classlocation="form-label"
                htmlFor="smartBoardFunctionalClass6"
              >
                Smart Board Functional Class 6
              </label>
              <select
                className={styles.formControl}
                {...register("smartBoardFunctionalClass6")}
                placeholder="Smart Board Functional Class 6"
              >
                <option value=""> Select 1 option</option>

                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="NotInstalled">NotInstalled</option>
              </select>
            </div>
            <br></br>
            <br></br>
            {/* <label>Smart Board Functional Class 7</label> */}
            <div className="form-check">
              <label
                classlocation="form-label"
                htmlFor="smartBoardFunctionalClass7"
              >
                Smart Board Functional Class 7
              </label>
              <select
                className={styles.formControl}
                {...register("smartBoardFunctionalClass7")}
                placeholder="Smart Board Functional Class 7"
              >
                <option value=""> Select 1 option</option>

                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="NotInstalled">NotInstalled</option>
              </select>
            </div>
            <br></br>
            <br></br>
            {/* <label>Smart Board Functional Class 8</label> */}
            <div className="form-check">
              <label
                classlocation="form-label"
                htmlFor="smartBoardFunctionalClass8"
              >
                Smart Board Functional Class 8
              </label>
              <select
                className={styles.formControl}
                {...register("smartBoardFunctionalClass8")}
                placeholder="Smart Board Functional Class 8"
              >
                <option value=""> Select 1 option</option>

                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="NotInstalled">NotInstalled</option>
              </select>
            </div>
            <br></br>
            <br></br>
            {/* <label>Smart Board Functional Class 9</label> */}
            <div className="form-check">
              <label
                classlocation="form-label"
                htmlFor="smartBoardFunctionalClass9"
              >
                Smart Board Functional Class 9
              </label>
              <select
                className={styles.formControl}
                {...register("smartBoardFunctionalClass9")}
                placeholder="Smart Board Functional Class 9"
              >
                <option value=""> Select 1 option</option>

                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="NotInstalled">NotInstalled</option>
              </select>
            </div>
            <br></br>
            <br></br>
            {/* <label>Smart Board Functional Class 10</label> */}
            <div className="form-check">
              <label
                classlocation="form-label"
                htmlFor="smartBoardFunctionalClass10"
              >
                Smart Board Functional Class 10
              </label>
              <select
                className={styles.formControl}
                {...register("smartBoardFunctionalClass10")}
                placeholder="Smart Board Functional Class 10"
              >
                <option value=""> Select 1 option</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="NotInstalled">NotInstalled</option>
              </select>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="state"
                id="state"
                placeholder="State"
                {...register("state")}
              ></input>
              {/* <label classstate="form-label" htmlFor="state">
                state
              </label> */}
              <div className={styles.errorMessage}>
                {errors.state && <p>{errors.state.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="district"
                id="district"
                placeholder="District"
                {...register("district")}
              ></input>
              {/* <label classdistrict="form-label" htmlFor="district">
                district
              </label> */}
              <div className={styles.errorMessage}>
                {errors.district && <p>{errors.district.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="block"
                id="block"
                placeholder="Block"
                {...register("block")}
              ></input>
              {/* <label classblock="form-label" htmlFor="block">
                block
              </label> */}
              <div className={styles.errorMessage}>
                {errors.block && <p>{errors.block.message}</p>}
              </div>
            </div>
            <br></br>
            <label>Adequate Rooms For Every Class</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="adequateRoomsForEveryClass"
                  id="adequateRoomsForEveryClass"
                  value="true"
                  checked
                  {...register("adequateRoomsForEveryClass")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="adequateRoomsForEveryClass"
                  id="adequateRoomsForEveryClass"
                  value="false"
                  {...register("adequateRoomsForEveryClass")}
                />
                <label
                  className="form-check-label"
                  htmlFor="adequateRoomsForEveryClass"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Drinking Water Supply</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="drinkingWaterSupply"
                  id="drinkingWaterSupply"
                  value="true"
                  checked
                  {...register("drinkingWaterSupply")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="drinkingWaterSupply"
                  id="drinkingWaterSupply"
                  value="false"
                  {...register("drinkingWaterSupply")}
                />
                <label
                  className="form-check-label"
                  htmlFor="drinkingWaterSupply"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Seperate Toilet For Girls And Boys</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="seperateToiletForGirlsAndBoys"
                  id="seperateToiletForGirlsAndBoys"
                  value="true"
                  checked
                  {...register("seperateToiletForGirlsAndBoys")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="seperateToiletForGirlsAndBoys"
                  id="seperateToiletForGirlsAndBoys"
                  value="false"
                  {...register("seperateToiletForGirlsAndBoys")}
                />
                <label
                  className="form-check-label"
                  htmlFor="seperateToiletForGirlsAndBoys"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Whether Toilet Being Used</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="whetherToiletBeingUsed"
                  id="whetherToiletBeingUsed"
                  value="true"
                  checked
                  {...register("whetherToiletBeingUsed")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="whetherToiletBeingUsed"
                  id="whetherToiletBeingUsed"
                  value="false"
                  {...register("whetherToiletBeingUsed")}
                />
                <label
                  className="form-check-label"
                  htmlFor="whetherToiletBeingUsed"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Playground Available</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="playgroundAvailable"
                  id="playgroundAvailable"
                  value="true"
                  checked
                  {...register("playgroundAvailable")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="playgroundAvailable"
                  id="playgroundAvailable"
                  value="false"
                  {...register("playgroundAvailable")}
                />
                <label
                  className="form-check-label"
                  htmlFor="playgroundAvailable"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Boundary Wall Fence</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="boundaryWallFence"
                  id="boundaryWallFence"
                  value="true"
                  checked
                  {...register("boundaryWallFence")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="boundaryWallFence"
                  id="boundaryWallFence"
                  value="false"
                  {...register("boundaryWallFence")}
                />
                <label className="form-check-label" htmlFor="boundaryWallFence">
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Electric Fittings Are Insulated</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="electricFittingsAreInsulated"
                  id="electricFittingsAreInsulated"
                  value="true"
                  checked
                  {...register("electricFittingsAreInsulated")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="electricFittingsAreInsulated"
                  id="electricFittingsAreInsulated"
                  value="false"
                  {...register("electricFittingsAreInsulated")}
                />
                <label
                  className="form-check-label"
                  htmlFor="electricFittingsAreInsulated"
                >
                  No
                </label>
              </div>
            </div>

            <br></br>
            <br></br>
            <label>
              Building Is Resistant To Earthquake Fire Flood Other Calamity
            </label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  id="buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  value="true"
                  checked
                  {...register(
                    "buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  )}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  id="buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  value="false"
                  {...register(
                    "buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                  )}
                />
                <label
                  className="form-check-label"
                  htmlFor="buildingIsResistantToEarthquakeFireFloodOtherCalamity"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Building Is Free From Inflammable And Toxic Materials</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="buildingIsFreeFromInflammableAndToxicMaterials"
                  id="buildingIsFreeFromInflammableAndToxicMaterials"
                  value="true"
                  checked
                  {...register(
                    "buildingIsFreeFromInflammableAndToxicMaterials"
                  )}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="buildingIsFreeFromInflammableAndToxicMaterials"
                  id="buildingIsFreeFromInflammableAndToxicMaterials"
                  value="false"
                  {...register(
                    "buildingIsFreeFromInflammableAndToxicMaterials"
                  )}
                />
                <label
                  className="form-check-label"
                  htmlFor="buildingIsFreeFromInflammableAndToxicMaterials"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <br></br>
            <label>Roof And Walls Are In Good Condition</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roofAndWallsAreInGoodCondition"
                  id="roofAndWallsAreInGoodCondition"
                  value="true"
                  checked
                  {...register("roofAndWallsAreInGoodCondition")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roofAndWallsAreInGoodCondition"
                  id="roofAndWallsAreInGoodCondition"
                  value="false"
                  {...register("roofAndWallsAreInGoodCondition")}
                />
                <label
                  className="form-check-label"
                  htmlFor="roofAndWallsAreInGoodCondition"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <br />
          {/* <button type="submit">Submit</button> */}
          <Button type="button" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SchoolForm;
