import axios from "axios";
import { teacherRegister } from "../routes/links";

const teacherAPI = async (data) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    name: data.name,
    username: data.userName,
    email: data.email,
    mobile: data.mobile,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    board: data.board,
    password: data.password,
    status: "true",
    groups: ["eedd138c-c14d-49c3-b5ca-a94fd74ec50c"],
    educationalQualification: data.educationalQualification,
    schoolUdise: data.schoolUdise,
    currentRole: data.currentRole,
    natureOfAppointment: data.natureOfAppointment,
    appointedPost: data.appointedPost,
    totalTeachingExperience: data.totalTeachingExperience,
    totalHeadteacherExperience: data.totalHeadteacherExperience,
    classesTaught: [data.classesTaught],
    coreSubjectTaught: data.coreSubjectTaught,
    attendedInserviceTraining: data.attendedInserviceTraining,
    lastTrainingAttendedTopic: data.lastTrainingAttendedTopic,
    lastTrainingAttendedYear: data.lastTrainingAttendedYear,
    trainedInComputerDigitalteaching: data.trainedInComputerDigitalteaching,
  };

  let result;
  await axios({
    method: "POST",
    url: teacherRegister,
    data: jsonData,
    headers: headers,
  })
    .then((res) => {
      localStorage.setItem("teacherId", res.data.data.teacherId);
      localStorage.setItem("userId", res.data.data.userId);

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

export default teacherAPI;
