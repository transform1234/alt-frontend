import axios from "axios";
import { studentRegister } from "../routes/links";

const studentAPI = async (data) => {
  const token = sessionStorage.getItem('token');

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
    name: data.firstName,
    username: "",
    email: data.email,
    mobile: data.mobile,
    gender: data.gender,
    dateOfBirth: data.dob,
    board: data.board,
    password: data.password,
    status: "true",
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
    noOfSiblings: data.siblings,
  };

  let result;
  await axios({
    method: "POST",
    url: studentRegister,
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

export default studentAPI;
