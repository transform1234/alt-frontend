import { teacherBulk } from "routes/links";
import axios from "axios";

const teacherBulkAPI = async (teacher) => {
  console.log("INSIDE teacher BULK");

  console.log("CSV Data:", teacher);

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
    url: teacherBulk,
    data: teacher,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);

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

export default teacherBulkAPI;
