import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import studentAPI from "api/studentAPI";
import StudentSchema from "schema/StudentSchema";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import styles from "./StudentForm.module.css";
import { groupSearch, schoolSearch } from "routes/links";

function StudentForm() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState([]);
  const [selectedUdiseCode, setSelectedUdiseCode] = useState([]);
  const [extractedUdise, setextractedUdise] = useState("");
  const [extractedName, setextractedName] = useState("");
  const [selectedgroup, setSelectedgroup] = useState(""); // Initialize with an empty string

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      limit: "20",
      page: 0,
      filters: {},
    };

    axios
      .post(schoolSearch, requestData, { headers })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [token]);

  useEffect(() => {
    if (Object.keys(selectedUdiseCode).length) {
      // Splitting string into an array using the comma
      const valuesArray = selectedUdiseCode.split(",");

      // Extracting and store the values in separate variables
      const udiseCode = valuesArray[0]; // "36220991573"

      setextractedUdise(udiseCode);
      const schoolName = valuesArray[1]; // "Gghs Hussaini Alam"
      setextractedName(schoolName);
      // Values in separate variables
    } else {
      console.error("selectedUdiseCode is not a string.");
    }
  }, [selectedUdiseCode]);

  useEffect(async () => {
   
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestData = {
      limit: 20,
      page: 0,
      filters: {
        schoolUdise: {
          eq: extractedUdise,
        },
      },
    };

    await axios
      .post(groupSearch, requestData, { headers })
      .then((response) => {
        setGroups(response.data.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error fetching data:", error);
      });
  }, [extractedUdise]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(StudentSchema) });
  const onSubmit = async (data) => {
    const result = await studentAPI(data);
    if (result == true) {
      alert("Registration Successful.");
      window.location.reload();
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
            <div className={styles.formLabel} style={{ marginBottom: "10px" }}>
              <H2>
                Interact with the requisite fields and execute a "Submit" action
                to preserve your alterations.
              </H2>
            </div>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="userName"
                id="firstName"
                placeholder="Student Name"
                {...register("firstName")}
              ></input>
              {/* <label className="form-label" htmlFor="firstName">
                Name
              </label> */}
              <div className={styles.errorMessage}>
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="userName"
                id="userName"
                placeholder="User Name"
                {...register("userName")}
              ></input>
              {/* <label className="form-label" htmlFor="userName">
                Username
              </label> */}
              <div className={styles.errorMessage}>
                {errors.userName && <p>{errors.userName.message}</p>}
              </div>
            </div>
            <br></br>
            <div className={styles.radiobutton}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="Male"
                  checked
                  {...register("gender")}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="gender"
                  value="Female"
                  {...register("gender")}
                />
                <label className="form-check-label" htmlFor="gender">
                  Female
                </label>
              </div>
            </div>
            {/* <div className="form-floating">
              <input
                                className={styles.formControl}

                type="text"
                name="gender"
                id="gender"
                placeholder="Name of the content"
                {...register("gender")}
              ></input>
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              {errors.gender && <p>{errors.gender.message}</p>}
            </div> */}
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="date"
                name="dob"
                id="dob"
                placeholder="Date of Birth"
                {...register("dob")}
              ></input>
              {/* <label className="form-label" htmlFor="dob">
                Date of Birth
              </label> */}
              <div className={styles.errorMessage}>
                {errors.dob && <p>{errors.dob.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                {...register("email")}
              ></input>
              {/* <label className="form-label" htmlFor="email">
                E-mail
              </label> */}
              <div className={styles.errorMessage}>
                {errors.email && <p>{errors.email.message}</p>}
              </div>
            </div>

            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Mobile"
                {...register("mobile")}
              ></input>
              {/* <label className="form-label" htmlFor="mobile">
                Mobile number
              </label> */}
              <div className={styles.errorMessage}>
                {errors.mobile && <p>{errors.mobile.message}</p>}
              </div>
            </div>
            <br></br>
            <div>
              {/* ... (previous form elements) */}
              <div className="form-floating">
                <select
                  className={styles.selectWrapper}
                  name="udise"
                  id="udise"
                  {...register("udise")}
                  value={selectedUdiseCode}
                  onChange={(e) => setSelectedUdiseCode(e.target.value)}
                >
                  <option value="">Select School Udise</option>{" "}
                  {/* Placeholder option */}
                  {data.map((school) => (
                    <option
                      key={school.udiseCode}
                      value={[school.udiseCode, school.name]}
                    >
                      {school.name}
                    </option>
                  ))}
                </select>
                {/* <label className="form-label" htmlFor="udise">
                  School Udise
                </label> */}
                <div className={styles.errorMessage}>
                  {errors.udise && <p>{errors.udise.message}</p>}
                </div>
              </div>
              {/* ... (more form elements) */}
            </div>
            <br></br>

            <div>
              {/* ... (previous form elements) */}
              <div className="form-floating">
                <select
                  className={styles.selectWrapper}
                  name="group"
                  id="group"
                  {...register("group")}
                  value={selectedgroup}
                  onChange={(e) => setSelectedgroup(e.target.value)}
                >
                  <option value="">Select Group</option>{" "}
                  {/* Placeholder option */}
                  {groups.map((school) => (
                    <option key={school.name} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>

                {/* <label className="form-label" htmlFor="udise">
                  Group
                </label> */}
                <div className={styles.errorMessage}>
                  {errors.group && <p>{errors.group.message}</p>}
                </div>
              </div>
              {/* ... (more form elements) */}
            </div>

            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="role"
                id="role"
                placeholder="Role"
                {...register("role")}
              ></input>
              {/* <label className="form-label" htmlFor="role">
                Role
              </label> */}
              <div className={styles.errorMessage}>
                {errors.role && <p>{errors.role.message}</p>}
              </div>
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
              {/* <label className="form-label" htmlFor="board">
                Board
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
                name="password"
                id="password"
                placeholder="Password"
                {...register("password")}
              ></input>
              {/* <label className="form-label" htmlFor="password">
                Password
              </label> */}
              <div className={styles.errorMessage}>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="grade"
                id="grade"
                placeholder="Grade"
                {...register("grade")}
              ></input>
              {/* <label className="form-label" htmlFor="grade">
                Grade
              </label> */}
              <div className={styles.errorMessage}>
                {errors.grade && <p>{errors.grade.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="religion"
                id="religion"
                placeholder="Religion"
                {...register("religion")}
              ></input>
              {/* <label className="form-label" htmlFor="religion">
                Religion
              </label> */}
              <div className={styles.errorMessage}>
                {errors.religion && <p>{errors.religion.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="caste"
                id="caste"
                placeholder="Caste"
                {...register("caste")}
              ></input>
              {/* <label className="form-label" htmlFor="caste">
                Caste
              </label> */}
              <div className={styles.errorMessage}>
                {errors.caste && <p>{errors.caste.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="annualIncome"
                id="annualIncome"
                placeholder="Annual Income"
                {...register("annualIncome")}
              ></input>
              {/* <label className="form-label" htmlFor="annual">
                Annual Income
              </label> */}
              <div className={styles.errorMessage}>
                {errors.annual && <p>{errors.annual.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="motherName"
                id="motherName"
                placeholder="Mother Name"
                {...register("motherName")}
              ></input>
              {/* <label className="form-label" htmlFor="motherName">
                Mother Name
              </label> */}
              <div className={styles.errorMessage}>
                {errors.motherName && <p>{errors.motherName.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="fatherName"
                id="fatherName"
                placeholder="Father Name"
                {...register("fatherName")}
              ></input>
              {/* <label className="form-label" htmlFor="fatherName">
                Father Name
              </label> */}
              <div className={styles.errorMessage}>
                {errors.fatherName && <p>{errors.fatherName.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="motherEducation"
                id="motherEducation"
                placeholder="Mother Education"
                {...register("motherEducation")}
              ></input>
              {/* <label className="form-label" htmlFor="motherEducation">
                Mother Education
              </label> */}
              <div className={styles.errorMessage}>
                {errors.motherEducation && (
                  <p>{errors.motherEducation.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="fatherEducation"
                id="fatherEducation"
                placeholder="Father Education"
                {...register("fatherEducation")}
              ></input>
              {/* <label className="form-label" htmlFor="fatherEducation">
                Father Education
              </label> */}
              <div className={styles.errorMessage}>
                {errors.fatherEducation && (
                  <p>{errors.fatherEducation.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="motherOccupation"
                id="motherOccupation"
                placeholder="Mother Occupation"
                {...register("motherOccupation")}
              ></input>
              {/* <label className="form-label" htmlFor="motherOccupation">
                Mother Occupation
              </label> */}
              <div className={styles.errorMessage}>
                {errors.motherOccupation && (
                  <p>{errors.motherOccupation.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="fatherOccupation"
                id="fatherOccupation"
                placeholder="Father Occupation"
                {...register("fatherOccupation")}
              ></input>
              {/* <label className="form-label" htmlFor="fatherOccupation">
                Father Occupation
              </label> */}
              <div className={styles.errorMessage}>
                {errors.fatherOccupation && (
                  <p>{errors.fatherOccupation.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="siblings"
                id="siblings"
                placeholder="Number of Siblings"
                {...register("siblings")}
              ></input>
              {/* <label className="form-label" htmlFor="siblings">
                Number of Siblings
              </label> */}
              <div className={styles.errorMessage}>
                {errors.siblings && <p>{errors.siblings.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="uniqueId"
                id="uniqueId"
                placeholder="Unique ID"
                {...register("uniqueId")}
              ></input>
              {/* <label className="form-label" htmlFor="uniqueId">
                Unique ID
              </label> */}
              <div className={styles.errorMessage}>
                {errors.uniqueId && <p>{errors.uniqueId.message}</p>}
              </div>
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
              {/* <label className="form-label" htmlFor="state">
                State
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
                name="block"
                id="block"
                placeholder="Block"
                {...register("block")}
              ></input>
              {/* <label className="form-label" htmlFor="block">
                Block
              </label> */}
              <div className={styles.errorMessage}>
                {errors.block && <p>{errors.block.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="serialNo"
                id="serialNo"
                placeholder="Serial No"
                {...register("serialNo")}
              ></input>
              {/* <label className="form-label" htmlFor="serialNo">
                Serial No
              </label> */}
              <div className={styles.errorMessage}>
                {errors.serialNo && <p>{errors.serialNo.message}</p>}
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
              {/* <label className="form-label" htmlFor="district">
                District
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
                name="section"
                id="section"
                placeholder="Section"
                {...register("section")}
              ></input>
              {/* <label className="form-label" htmlFor="section">
                Section
              </label> */}
              <div className={styles.errorMessage}>
                {errors.section && <p>{errors.section.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="medium"
                id="medium"
                placeholder="Medium"
                {...register("medium")}
              ></input>
              {/* <label className="form-label" htmlFor="medium">
                Medium
              </label> */}
              <div className={styles.errorMessage}>
                {errors.medium && <p>{errors.medium.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="bloodGroup"
                id="bloodGroup"
                placeholder="BloodGroup"
                {...register("bloodGroup")}
              ></input>
              {/* <label className="form-label" htmlFor="bloodGroup">
                Blood Group
              </label> */}
              <div className={styles.errorMessage}>
                {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}
              </div>
            </div>

            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="status"
                id="status"
                placeholder="Status"
                {...register("status")}
              ></input>
              {/* <label className="form-label" htmlFor="status">
                Status
              </label> */}
              <div className={styles.errorMessage}>
                {errors.status && <p>{errors.status.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="image"
                id="image"
                placeholder="Image"
                {...register("image")}
              ></input>
              {/* <label className="form-label" htmlFor="image">
                Image
              </label> */}
              <div className={styles.errorMessage}>
                {errors.image && <p>{errors.image.message}</p>}
              </div>
            </div>
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

export default StudentForm;
