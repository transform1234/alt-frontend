import { schoolBulk } from "routes/links";
import axios from "axios";

const schoolBulkAPI = async (school) => {
  console.log("INSIDE SCHOOL BULK");

  console.log("CSV Data:", school);

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
    url: schoolBulk,
    data: school,
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

export default schoolBulkAPI;
