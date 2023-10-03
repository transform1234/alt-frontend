import axios from "axios";
import { studentReset } from "../routes/links";

const studentResetPasswordAPI = async (username, password) => {
  console.log("INSIDE RESET PASS API");
  console.log(username, password);

  const token = localStorage.getItem("token");

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    username: username,
    newPassword: password,
  };

  let result;
  await axios({
    method: "POST",
    url: studentReset,
    data: jsonData,
    headers: headers,
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.statusCode);
      if (res.data.statusCode === 200) {
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

export default studentResetPasswordAPI;
