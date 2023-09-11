import React from "react";
import { useForm } from "react-hook-form";
import { H2 } from "@shiksha/common-lib";
import { Button } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import TeacherSchema from "schema/TeacherSchema";
import teacherAPI from "api/teacherAPI";

function TeacherForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TeacherSchema) });
  const onSubmit = async (data) => {
    const result = await teacherAPI(data);
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
                name="educationalQualification"
                id="educationalQualification"
                placeholder="Name of the content"
                {...register("educationalQualification")}
              ></input>
              <label className="form-label" htmlFor="educationalQualification">
                Educational Qualification
              </label>
              {errors.educationalQualification && (
                <p>{errors.educationalQualification.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="currentRole"
                id="currentRole"
                placeholder="Name of the content"
                {...register("currentRole")}
              ></input>
              <label className="form-label" htmlFor="currentRole">
                Current Role
              </label>
              {errors.currentRole && <p>{errors.currentRole.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="natureOfappointment"
                id="natureOfappointment"
                placeholder="Name of the content"
                {...register("natureOfappointment")}
              ></input>
              <label className="form-label" htmlFor="natureOfappointment">
                Nature Of appointment
              </label>
              {errors.natureOfappointment && (
                <p>{errors.natureOfappointment.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="appointedPostName"
                id="appointedPostName"
                placeholder="Name of the content"
                {...register("appointedPostName")}
              ></input>
              <label className="form-label" htmlFor="appointedPostName">
                Appointed Post Name
              </label>
              {errors.appointedPostName && (
                <p>{errors.appointedPostName.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="totalExperienceInTeaching"
                id="totalExperienceInTeaching"
                placeholder="Name of the content"
                {...register("totalExperienceInTeaching")}
              ></input>
              <label className="form-label" htmlFor="totalExperienceInTeaching">
                Total Experience In Teaching
              </label>
              {errors.totalExperienceInTeaching && (
                <p>{errors.totalExperienceInTeaching.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="totalExperienceAsHead"
                id="totalExperienceAsHead"
                placeholder="Name of the content"
                {...register("totalExperienceAsHead")}
              ></input>
              <label className="form-label" htmlFor="totalExperienceAsHead">
                Total Experience As Head
              </label>
              {errors.totalExperienceAsHead && (
                <p>{errors.totalExperienceAsHead.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="classTaught"
                id="classTaught"
                placeholder="Name of the content"
                {...register("classTaught")}
              ></input>
              <label className="form-label" htmlFor="classTaught">
                Class Taught
              </label>
              {errors.classTaught && <p>{errors.classTaught.message}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="coreSubjectTaught"
                id="coreSubjectTaught"
                placeholder="Name of the content"
                {...register("coreSubjectTaught")}
              ></input>
              <label className="form-label" htmlFor="coreSubjectTaught">
                Core Subject Taught
              </label>
              {errors.coreSubjectTaught && (
                <p>{errors.coreSubjectTaught.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="attendedInServiceTraining"
                id="attendedInServiceTraining"
                placeholder="Name of the content"
                {...register("attendedInServiceTraining")}
              ></input>
              <label className="form-label" htmlFor="attendedInServiceTraining">
                Attended In Service Training
              </label>
              {errors.attendedInServiceTraining && (
                <p>{errors.attendedInServiceTraining.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="lastTrainingAttendedTopic"
                id="lastTrainingAttendedTopic"
                placeholder="Name of the content"
                {...register("lastTrainingAttendedTopic")}
              ></input>
              <label className="form-label" htmlFor="lastTrainingAttendedTopic">
                Last Training Attended Topic
              </label>
              {errors.lastTrainingAttendedTopic && (
                <p>{errors.lastTrainingAttendedTopic.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="lastTrainingAttendedYear"
                id="lastTrainingAttendedYear"
                placeholder="Name of the content"
                {...register("lastTrainingAttendedYear")}
              ></input>
              <label className="form-label" htmlFor="lastTrainingAttendedYear">
                Last Training Attended Year
              </label>
              {errors.lastTrainingAttendedYear && (
                <p>{errors.lastTrainingAttendedYear.message}</p>
              )}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="TrainedinUseofComputerAndDigitalTeaching"
                id="TrainedinUseofComputerAndDigitalTeaching"
                placeholder="Name of the content"
                {...register("TrainedinUseofComputerAndDigitalTeaching")}
              ></input>
              <label
                className="form-label"
                htmlFor="TrainedinUseofComputerAndDigitalTeaching"
              >
                Trained in Use of Computer And Digital Teaching
              </label>
              {errors.TrainedinUseofComputerAndDigitalTeaching && (
                <p>{errors.TrainedinUseofComputerAndDigitalTeaching.message}</p>
              )}
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

export default TeacherForm;
