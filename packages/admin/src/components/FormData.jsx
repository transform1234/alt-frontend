import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import UploadSchema from "schema/UploadSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import studentAPI from "api/studentAPI";

function FormData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UploadSchema) });
  const onSubmit = async (data) => {
    const result = await studentAPI(data);
    if (result == true) {
      alert("Registration Successful.");
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
                name="firstName"
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
          </div>
          <Button type="button" onPress={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormData;
