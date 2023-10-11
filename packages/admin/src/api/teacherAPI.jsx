import axios from "axios";
import { teacherRegister } from "../routes/links";

const teacherAPI = async (data) => {
  const token = sessionStorage.getItem('token');

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
    educationalQualification: data.educationalQualification,
    schoolUdise: data.schoolUdise,
    currentRole: data.currentRole,
    natureOfAppointment: data.natureOfAppointment,
    appointedPost: data.appointedPost,
    totalTeachingExperience: data.totalTeachingExperience,
    totalHeadteacherExperience: data.totalHeadteacherExperience,
    classesTaught: data.classesTaught,
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
