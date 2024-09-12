import axios from "axios";
import { studentRegister } from "../routes/links";

const studentUpdateAPI = async (data) => {
  const token = sessionStorage.getItem("token");

  const schoolUdise = data.udise.split(",");

  // Extracting the udise value in separate variable
  const udiseCode = schoolUdise[0];

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    name: data.name,
    username:data.username ? data.username:  "",
    email: data.email,
    mobile: data.mobile,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    board: data.board,
    // status: "true",
    className: data.group,
    groups: [],
    religion: data.religion,
    schoolUdise: udiseCode,
    caste: data.caste,
    annualIncome: data.annualIncome,
    motherEducation: data.motherEducation,
    fatherEducation: data.fatherEducation,
    motherOccupation: data.motherOccupation,
    fatherOccupation: data.fatherOccupation,
    noOfSiblings: data.noOfSiblings,
    motherName : data.motherName,
    fatherName : data.fatherName,
    medium : data.medium
    // studentEnrollId: data.studentEnrollId,
  };

  let result;
  await axios({
    method: "PUT",
    url: studentRegister +"/"+ data.userId,
    data: jsonData,
    headers: headers,
  })
    .then((res) => {
      if (res.data && res.data.errorCode) {
        result = false;
      } else {
        result = true;
      }
    })
    .catch(function (error) {
      let err = 0;
      return err;
    });

  return result;
};

export default studentUpdateAPI;
