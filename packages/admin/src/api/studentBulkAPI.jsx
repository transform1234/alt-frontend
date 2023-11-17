import { studentBulk } from "routes/links";
import axios from "axios";

const studentBulkAPI = async (student) => {
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
    url: studentBulk,
    data: student,
    headers: headers,
  })
    .then((res) => {
   
      // Extract student information and store it in localStorage
      const responses = res.data.responses;

      responses.forEach(response => {
          const studentId = response.studentId;
          const message = response.message;
          const username = response.username;
          const schoolUdise = response.schoolUdise;

          const studentData = {
              studentId,
              message,
              username,
              schoolUdise
          };

          // studentId to the storage key to avoid overwriting
          localStorage.setItem(`student_${studentId}`, JSON.stringify(studentData));
          
      });

      localStorage.setItem("successCount", res.data.successCount);
      localStorage.setItem("errorCount", res.data.errors.length);

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
