import { schoolBulk } from "routes/links";
import axios from "axios";

const schoolBulkAPI = async (school) => {
  const token = sessionStorage.getItem("token");

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
      console.log(res);
      const names = res.data.data.errors
        .map((error) => error.name)
        .filter(Boolean);
      if (res.data.data.errors && res.data.data.errors.length > 0) {
        const firstError = res.data.data.errors[0];
        if (firstError.schoolRes && firstError.schoolRes.errorMessage) {
          const errorMessage = firstError.schoolRes.errorMessage;
          localStorage.setItem("errorMessage", errorMessage);
        } else {
          console.log("No error message found in the first error object.");
        }
      } else {
        console.log("No errors in the response data.");
      }

      localStorage.setItem("bulkErrors", res.data.data.errors.length);
      localStorage.setItem("bulkErrorsNames", names);
      localStorage.setItem("successCount", res.data.data.successCount);

      if (res.status === 200) {
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
