import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import TeacherSchema from "schema/TeacherSchema";
import teacherAPI from "api/teacherAPI";
import styles from "./StudentForm.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { schoolSearch } from "routes/links";

function TeacherForm() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState([]);
  const [selectedUdiseCode, setSelectedUdiseCode] = useState([]);
  const [extractedUdise, setextractedUdise] = useState("");
  const [extractedName, setextractedName] = useState("");

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TeacherSchema) });
  const onSubmit = async (data) => {
    const result = await teacherAPI(data);

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
                name="name"
                id="name"
                placeholder="Teacher Name"
                {...register("name")}
              ></input>
              {/* <label className="form-label" htmlFor="firstName">
                Name
              </label> */}
              <div className={styles.errorMessage}>
                {errors.name && <p>{errors.name.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="username"
                id="username"
                placeholder="username"
                {...register("username")}
              ></input>
              {/* <label className="form-label" htmlFor="username">
                username
              </label> */}
              <div className={styles.errorMessage}>
                {errors.username && <p>{errors.username.message}</p>}
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
                name="dateOfBirth"
                id="dateOfBirth"
                placeholder="Date of Birth"
                {...register("dateOfBirth")}
              ></input>
              {/* <label className="form-label" htmlFor="dateOfBirth">
                Date of Birth
              </label> */}
              <div className={styles.errorMessage}>
                {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
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
                placeholder="mobile"
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
            <div className="form-floating">
              <select
                className={styles.selectWrapper}
                name="schoolUdise"
                id="schoolUdise"
                {...register("schoolUdise")}
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
              {/* <label className="form-label" htmlFor="schoolUdise">
                School schoolUdise
              </label> */}
              <div className={styles.errorMessage}>
                {errors.schoolUdise && <p>{errors.schoolUdise.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="currentRole"
                id="currentRole"
                placeholder="Current Role"
                {...register("currentRole")}
              ></input>
              {/* <label className="form-label" htmlFor="role">
                Role
              </label> */}
              <div className={styles.errorMessage}>
                {errors.currentRole && <p>{errors.currentRole.message}</p>}
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
                name="educationalQualification"
                id="educationalQualification"
                placeholder="Educational Qualification"
                {...register("educationalQualification")}
              ></input>
              {/* <label className="form-label" htmlFor="educationalQualification">
                Educational Qualification
              </label> */}
              <div className={styles.errorMessage}>
                {errors.educationalQualification && (
                  <p>{errors.educationalQualification.message}</p>
                )}
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
                name="natureOfAppointment"
                id="natureOfAppointment"
                placeholder="Nature Of Appointment"
                {...register("natureOfAppointment")}
              ></input>
              {/* <label className="form-label" htmlFor="natureOfappointment">
                Nature Of appointment
              </label> */}
              <div className={styles.errorMessage}>
                {errors.natureOfAppointment && (
                  <p>{errors.natureOfAppointment.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="appointedPost"
                id="appointedPost"
                placeholder="Appointed Post"
                {...register("appointedPost")}
              ></input>
              {/* <label className="form-label" htmlFor="appointedPostName">
                Appointed Post Name
              </label> */}
              <div className={styles.errorMessage}>
                {errors.appointedPost && <p>{errors.appointedPost.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="totalTeachingExperience"
                id="totalTeachingExperience"
                placeholder="Total Teaching Experience"
                {...register("totalTeachingExperience")}
              ></input>
              {/* <label className="form-label" htmlFor="totalExperienceInTeaching">
                Total Experience In Teaching
              </label> */}
              <div className={styles.errorMessage}>
                {errors.totalTeachingExperience && (
                  <p>{errors.totalTeachingExperience.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="totalHeadteacherExperience"
                id="totalHeadteacherExperience"
                placeholder="Total Headteacher Experience"
                {...register("totalHeadteacherExperience")}
              ></input>
              {/* <label className="form-label" htmlFor="totalExperienceAsHead">
                Total Experience As Head
              </label> */}
              <div className={styles.errorMessage}>
                {errors.totalHeadteacherExperience && (
                  <p>{errors.totalHeadteacherExperience.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <select
                className={styles.formControl}
                name="classesTaught"
                id="classesTaught"
                {...register("classesTaught")}
              >
                <option value="Secondary">Secondary</option>
                <option value="Middle">Middle</option>
                <option value="Both">Both</option>
              </select>
              {/* <label className="form-label" htmlFor="classTaught">
                Class Taught
              </label> */}
              <div className={styles.errorMessage}>
                {errors.classesTaught && <p>{errors.classesTaught.message}</p>}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="coreSubjectTaught"
                id="coreSubjectTaught"
                placeholder="Core Subject Taught"
                {...register("coreSubjectTaught")}
              ></input>
              {/* <label className="form-label" htmlFor="coreSubjectTaught">
                Core Subject Taught
              </label> */}
              <div className={styles.errorMessage}>
                {errors.coreSubjectTaught && (
                  <p>{errors.coreSubjectTaught.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="attendedInserviceTraining"
                id="attendedInserviceTraining"
                placeholder="Attended Inservice Training"
                {...register("attendedInserviceTraining")}
              ></input>
              {/* <label className="form-label" htmlFor="attendedInServiceTraining">
                Attended In Service Training
              </label> */}
              <div className={styles.errorMessage}>
                {errors.attendedInserviceTraining && (
                  <p>{errors.attendedInserviceTraining.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="lastTrainingAttendedTopic"
                id="lastTrainingAttendedTopic"
                placeholder="Last Training Attended Topic"
                {...register("lastTrainingAttendedTopic")}
              ></input>
              {/* <label className="form-label" htmlFor="lastTrainingAttendedTopic">
                Last Training Attended Topic
              </label> */}
              <div className={styles.errorMessage}>
                {errors.lastTrainingAttendedTopic && (
                  <p>{errors.lastTrainingAttendedTopic.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="lastTrainingAttendedYear"
                id="lastTrainingAttendedYear"
                placeholder="Last Training Attended Year"
                {...register("lastTrainingAttendedYear")}
              ></input>
              {/* <label className="form-label" htmlFor="lastTrainingAttendedYear">
                Last Training Attended Year
              </label> */}
              <div className={styles.errorMessage}>
                {errors.lastTrainingAttendedYear && (
                  <p>{errors.lastTrainingAttendedYear.message}</p>
                )}
              </div>
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className={styles.formControl}
                type="text"
                name="trainedInComputerDigitalteaching"
                id="trainedInComputerDigitalteaching"
                placeholder="Trained In Computer Digital teaching"
                {...register("trainedInComputerDigitalteaching")}
              ></input>
              {/* <label
                className="form-label"
                htmlFor="trainedInComputerDigitalteaching"
              >
                Trained in Use of Computer And Digital Teaching
              </label> */}
              <div className={styles.errorMessage}>
                {errors.trainedInComputerDigitalteaching && (
                  <p>{errors.trainedInComputerDigitalteaching.message}</p>
                )}
              </div>
            </div>
          </div>
          <br />
          <br />
          <Button type="button" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TeacherForm;
