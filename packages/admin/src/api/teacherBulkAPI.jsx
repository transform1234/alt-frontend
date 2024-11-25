import { teacherBulk } from "routes/links";
import axios from "axios";

const teacherBulkAPI = async (teacher) => {
  const token = sessionStorage.getItem('token');

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
      const names = res?.data?.data?.errors.map((error) => error.name).filter(Boolean);
      if (res?.data?.data?.errors && res?.data?.data?.errors.length > 0) {
        const firstError = res?.data?.data?.errors[0];
        if (firstError.teacherRes && firstError.teacherRes.errorMessage) {
          const errorMessage = firstError.teacherRes.errorMessage;
          localStorage.setItem("errorMessage", errorMessage);
        } else {
          console.log("No error message found in the first error object.");
        }
      } else {
        console.log("No errors in the response data.");
      }

      const errorCount = res?.data?.data?.errors?.length ?? 0;
      localStorage.setItem("bulkErrors", errorCount > 0 ? errorCount - 1 : 0);
      localStorage.setItem("bulkErrorsNames", names);
      localStorage.setItem("successCount", res?.data?.data?.successCount);
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

export default teacherBulkAPI;
