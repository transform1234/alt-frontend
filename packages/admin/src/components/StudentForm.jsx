import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import studentAPI from "api/studentAPI";
import StudentSchema from "schema/StudentSchema";

function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(StudentSchema) });
  const onSubmit = async (data) => {
    const result = await studentAPI(data);
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
                className="form-control"
                type="text"
                name="userName"
                id="firstName"
                placeholder="Name of the content"
                {...register("firstName")}
              ></input>
              <label className="form-label" htmlFor="firstName">
                Name
              </label>
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="userName"
                id="userName"
                placeholder="userName"
                {...register("userName")}
              ></input>
              <label className="form-label" htmlFor="userName">
                Username
              </label>
              {errors.userName && <p>{errors.userName.message}</p>}
            </div>
            <br></br>
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
            {/* <div className="form-floating">
              <input
                className="form-control"
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
                className="form-control"
                type="date"
                name="dob"
                id="dob"
                placeholder="Name of the content"
                {...register("dob")}
              ></input>
              <label className="form-label" htmlFor="dob">
                Date of Birth
              </label>
              {errors.dob && <p>{errors.dob.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                placeholder="Name of the content"
                {...register("email")}
              ></input>
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Name of the content"
                {...register("mobile")}
              ></input>
              <label className="form-label" htmlFor="mobile">
                Mobile number
              </label>
              {errors.mobile && <p>{errors.mobile.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="udise"
                id="udise"
                placeholder="Name of the content"
                {...register("udise")}
              ></input>
              <label className="form-label" htmlFor="udise">
                School Udise
              </label>
              {errors.udise && <p>{errors.udise.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="role"
                id="role"
                placeholder="role"
                {...register("role")}
              ></input>
              <label className="form-label" htmlFor="role">
                Role
              </label>
              {errors.role && <p>{errors.role.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="board"
                id="board"
                placeholder="board"
                {...register("board")}
              ></input>
              <label className="form-label" htmlFor="board">
                Board
              </label>
              {errors.board && <p>{errors.board.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="password"
                id="password"
                placeholder="password"
                {...register("password")}
              ></input>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="grade"
                id="grade"
                placeholder="Name of the content"
                {...register("grade")}
              ></input>
              <label className="form-label" htmlFor="grade">
                Grade
              </label>
              {errors.grade && <p>{errors.grade.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="religion"
                id="religion"
                placeholder="Name of the content"
                {...register("religion")}
              ></input>
              <label className="form-label" htmlFor="religion">
                Religion
              </label>
              {errors.religion && <p>{errors.religion.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="caste"
                id="caste"
                placeholder="Name of the content"
                {...register("caste")}
              ></input>
              <label className="form-label" htmlFor="caste">
                Caste
              </label>
              {errors.caste && <p>{errors.caste.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="annualIncome"
                id="annualIncome"
                placeholder="Name of the content"
                {...register("annualIncome")}
              ></input>
              <label className="form-label" htmlFor="annual">
                Annual Income
              </label>
              {errors.annual && <p>{errors.annual.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="motherName"
                id="motherName"
                placeholder="Name of the content"
                {...register("motherName")}
              ></input>
              <label className="form-label" htmlFor="motherName">
                Mother Name
              </label>
              {errors.motherName && <p>{errors.motherName.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="fatherName"
                id="fatherName"
                placeholder="Name of the content"
                {...register("fatherName")}
              ></input>
              <label className="form-label" htmlFor="fatherName">
                Father Name
              </label>
              {errors.fatherName && <p>{errors.fatherName.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="motherEducation"
                id="motherEducation"
                placeholder="Name of the content"
                {...register("motherEducation")}
              ></input>
              <label className="form-label" htmlFor="motherEducation">
                Mother Education
              </label>
              {errors.motherEducation && (
                <p>{errors.motherEducation.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="fatherEducation"
                id="fatherEducation"
                placeholder="Name of the content"
                {...register("fatherEducation")}
              ></input>
              <label className="form-label" htmlFor="fatherEducation">
                Father Education
              </label>
              {errors.fatherEducation && (
                <p>{errors.fatherEducation.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="motherOccupation"
                id="motherOccupation"
                placeholder="Name of the content"
                {...register("motherOccupation")}
              ></input>
              <label className="form-label" htmlFor="motherOccupation">
                Mother Occupation
              </label>
              {errors.motherOccupation && (
                <p>{errors.motherOccupation.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="fatherOccupation"
                id="fatherOccupation"
                placeholder="Name of the content"
                {...register("fatherOccupation")}
              ></input>
              <label className="form-label" htmlFor="fatherOccupation">
                Father Occupation
              </label>
              {errors.fatherOccupation && (
                <p>{errors.fatherOccupation.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="siblings"
                id="siblings"
                placeholder="Name of the content"
                {...register("siblings")}
              ></input>
              <label className="form-label" htmlFor="siblings">
                Number of Siblings
              </label>
              {errors.siblings && <p>{errors.siblings.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="uniqueId"
                id="uniqueId"
                placeholder="Name of the content"
                {...register("uniqueId")}
              ></input>
              <label className="form-label" htmlFor="uniqueId">
                Unique ID
              </label>
              {errors.uniqueId && <p>{errors.uniqueId.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="state"
                id="state"
                placeholder="Name of the content"
                {...register("state")}
              ></input>
              <label className="form-label" htmlFor="state">
                State
              </label>
              {errors.state && <p>{errors.state.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="block"
                id="block"
                placeholder="Name of the content"
                {...register("block")}
              ></input>
              <label className="form-label" htmlFor="block">
                Block
              </label>
              {errors.block && <p>{errors.block.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="serialNo"
                id="serialNo"
                placeholder="Name of the content"
                {...register("serialNo")}
              ></input>
              <label className="form-label" htmlFor="serialNo">
                Serial No
              </label>
              {errors.serialNo && <p>{errors.serialNo.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="district"
                id="district"
                placeholder="Name of the content"
                {...register("district")}
              ></input>
              <label className="form-label" htmlFor="district">
                District
              </label>
              {errors.district && <p>{errors.district.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="section"
                id="section"
                placeholder="Name of the content"
                {...register("section")}
              ></input>
              <label className="form-label" htmlFor="section">
                Section
              </label>
              {errors.section && <p>{errors.section.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="medium"
                id="medium"
                placeholder="Name of the content"
                {...register("medium")}
              ></input>
              <label className="form-label" htmlFor="medium">
                Medium
              </label>
              {errors.medium && <p>{errors.medium.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="bloodGroup"
                id="bloodGroup"
                placeholder="Name of the content"
                {...register("bloodGroup")}
              ></input>
              <label className="form-label" htmlFor="bloodGroup">
                Blood Group
              </label>
              {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="status"
                id="status"
                placeholder="Name of the content"
                {...register("status")}
              ></input>
              <label className="form-label" htmlFor="status">
                Status
              </label>
              {errors.status && <p>{errors.status.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="image"
                id="image"
                placeholder="Name of the content"
                {...register("image")}
              ></input>
              <label className="form-label" htmlFor="image">
                Image
              </label>
              {errors.image && <p>{errors.image.message}</p>}
            </div>
          </div>
          <Button type="button" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
