import { studentBulk } from "routes/links";
import axios from "axios";

const studentBulkAPI = async (student) => {
  console.log("INSIDE STUDENT BULK");

  console.log("CSV Data:", student);

  const token = localStorage.getItem("token");

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization: `Bearer ${token}`,
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  let result;
  await axios({
    method: "POST",
    url: studentBulk,
    data: student,
    headers: headers,
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.successCount);
      localStorage.setItem("successCount", res.data.successCount);

      if (res.status === 201) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch(function (error) {
      console.log(error.response.data.error);
      let err = 0;
      return err;
    });

  return result;
};

export default studentBulkAPI;
