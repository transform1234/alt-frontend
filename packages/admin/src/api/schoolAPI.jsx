import axios from "axios";
import { schoolRegister } from "../routes/links";

const schoolAPI = async (data) => {
  console.log("INSIDE API");
  console.log(data);

  // const token = localStorage.getItem("token");

  // const headers = {
  //   "Accept-Language": "en-GB,en;q=0.9",
  //   Authorization: `Bearer ${token}`,
  //   Connection: "keep-alive",
  //   "Content-Type": "application/json",
  // };

  // const jsonData = {
  //   name: data.firstName,
  //   username: data.userName,
  //   email: data.email,
  //   mobile: data.mobile,
  //   gender: data.gender,
  //   dateOfBirth: data.dob,
  //   board: data.board,
  //   password: data.password,
  //   status: "true",
  //   groups: [data.group],
  //   religion: data.religion,
  //   schoolUdise: data.udise,
  //   caste: data.caste,
  //   annualIncome: data.annualIncome,
  //   motherEducation: data.motherEducation,
  //   fatherEducation: data.fatherEducation,
  //   motherOccupation: data.motherOccupation,
  //   fatherOccupation: data.fatherOccupation,
  //   noOfSiblings: data.siblings,
  // };

  let result = true;
  // await axios({
  //   method: "POST",
  //   url: schoolRegister,
  //   data: jsonData,
  //   headers: headers,
  // })
  //   .then((res) => {
  //     console.log(res);
  //     // console.log(res.data);
  //     console.log(res.data.data.studentId);
  //     console.log(res.data.data.userId);

  //     localStorage.setItem("studentId", res.data.data.studentId);
  //     localStorage.setItem("userId", res.data.data.userId);

  //     if (res.status === 201) {
  //       result = true;
  //     } else {
  //       result = false;
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error.response.data.error);
  //     let err = 0;
  //     return err;
  //   });

  return result;
};

export default schoolAPI;