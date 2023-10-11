import axios from "axios";
import { studentReset } from "../routes/links";

const studentResetPasswordAPI = async (username, password) => {
  const token = sessionStorage.getItem('token');

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
