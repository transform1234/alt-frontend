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
  const onSubmit = async (data) => {
    console.log(data);
    const result = await schoolAPI(data);
    if (result == true) {
      let sID = localStorage.getItem("studentId");
      let uID = localStorage.getItem("userId");
      alert(
        "Registration Successful.\nStudent ID: " + sID + "\nUser ID: " + uID
      );
    } else {
      alert("Registeration failed");
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
              <input
                className={styles.formControl}
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                {...register("location")}
              ></input>
              {/* <label classlocation="form-label" htmlFor="location">
                location
              </label> */}
              {errors.location && <p>{errors.location.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="management"
                id="management"
                placeholder="management"
                {...register("management")}
              ></input>
              {/* <label classmanagement="form-label" htmlFor="management">
                management
              </label> */}
              {errors.management && <p>{errors.management.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="composition"
                id="composition"
                placeholder="composition"
                {...register("composition")}
              ></input>
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
                placeholder="board"
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
                placeholder="mediumOfInstruction"
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
                placeholder="headmaster"
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
                placeholder="headmasterMobile"
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
              <input
                className={styles.formControl}
                type="number"
                name="upperPrimaryTeachersSanctioned"
                id="upperPrimaryTeachersSanctioned"
                placeholder="upperPrimaryTeachersSanctioned"
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
                placeholder="secondaryTeachersSanctioned"
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
            <label>Computer Lab Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="computerLabFunctional"
                  id="computerLabFunctional"
                  value="true"
                  checked
                  {...register("computerLabFunctional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="computerLabFunctional"
                  id="computerLabFunctional"
                  value="false"
                  {...register("computerLabFunctional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="computerLabFunctional"
                >
                  No
                </label>
              </div>
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
                placeholder="totalFunctionalComputers"
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
                placeholder="noOfBoysToilet"
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
                placeholder="noOfGirlsToilet"
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
            <label>smrtBrd6Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd6Functional"
                  id="smrtBrd6Functional"
                  value="true"
                  checked
                  {...register("smrtBrd6Functional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd6Functional"
                  id="smrtBrd6Functional"
                  value="false"
                  {...register("smrtBrd6Functional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="smrtBrd6Functional"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <label>smrtBrd7Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd7Functional"
                  id="smrtBrd7Functional"
                  value="true"
                  checked
                  {...register("smrtBrd7Functional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd7Functional"
                  id="smrtBrd7Functional"
                  value="false"
                  {...register("smrtBrd7Functional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="smrtBrd7Functional"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <label>smrtBrd8Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd8Functional"
                  id="smrtBrd8Functional"
                  value="true"
                  checked
                  {...register("smrtBrd8Functional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd8Functional"
                  id="smrtBrd8Functional"
                  value="false"
                  {...register("smrtBrd8Functional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="smrtBrd8Functional"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <label>smrtBrd9Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd9Functional"
                  id="smrtBrd9Functional"
                  value="true"
                  checked
                  {...register("smrtBrd9Functional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd9Functional"
                  id="smrtBrd9Functional"
                  value="false"
                  {...register("smrtBrd9Functional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="smrtBrd9Functional"
                >
                  No
                </label>
              </div>
            </div>
            <br></br>
            <label>smrtBrd10Functional</label>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd10Functional"
                  id="smrtBrd10Functional"
                  value="true"
                  checked
                  {...register("smrtBrd10Functional")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="smrtBrd10Functional"
                  id="smrtBrd10Functional"
                  value="false"
                  {...register("smrtBrd10Functional")}
                />
                <label
                  className="form-check-label"
                  htmlFor="smrtBrd10Functional"
                >
                  No
                </label>
              </div>
            </div>
            {errors.smrtBrd10Functional && (
              <p>{errors.smrtBrd10Functional.message}</p>
            )}
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="state"
                id="state"
                placeholder="state"
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
                placeholder="district"
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
                placeholder="block"
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
            <label>adequateRoomsForEveryClass</label>
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
            <label>drinkingWaterSupply</label>
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
            <label>seperateToiletForGirlsAndBoys</label>
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
            <label>whetherToiletBeingUsed</label>
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
            <label>playgroundAvailable</label>
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
            <label>boundaryWallFence</label>
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
            <label>electricFittingsAreInsulated</label>
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
            <label>buildingIsResistantToEarthquakeFireFloodOtherCalamity</label>
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
            <label>buildingIsFreeFromInflammableAndToxicMaterials</label>
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
            <label>roofAndWallsAreInGoodCondition</label>
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
            <br></br>
          </div>
          <br />
          <Button type="button" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SchoolForm;
