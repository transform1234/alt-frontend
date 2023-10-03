import axios from "axios";
import { studentReset } from "../routes/links";

const studentAPI = async (data) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    username: data.username,
    newPassword: data.newPassword,
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
      console.log(res.status);
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
