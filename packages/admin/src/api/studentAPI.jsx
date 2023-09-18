import axios from "axios";
import { studentRegister } from "../routes/links";

const studentAPI = async (data) => {
  console.log("INSIDE API");
  console.log(data);

  const headers = {
    "Accept-Language": "en-GB,en;q=0.9",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqckt6U0pocGJ4N3VPbEQwQUQ2NER4bjNiZzUzd1pyRUYyYVVLWVFjVmtnIn0.eyJleHAiOjE2OTUwNDgwMzAsImlhdCI6MTY5NTAxMjAzMCwianRpIjoiZTUwMTAxNTItZDdmZi00ZTZlLWE4NDctMjgxZDVlZDJmODY0IiwiaXNzIjoiaHR0cHM6Ly9hbHQudW5pdGVmcmFtZXdvcmsuaW8vYXV0aC9yZWFsbXMvaGFzdXJhLWFwcCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIxYzgzYzM0YS00NmM1LTRmYTEtOGY5MS1iYWE0NzI3OWU0MTciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJoYXN1cmEtYXBwIiwic2Vzc2lvbl9zdGF0ZSI6ImFkOGQyYTQyLTgwM2QtNDFhYS05YjhiLWY2ZDllZWYyNWI3MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1oc3VyYS1hcHAiLCJkZWZhdWx0LXJvbGVzLWhhc3VyYS1hcHAiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiaGFzdXJhLWFwcCI6eyJyb2xlcyI6WyJzeXN0ZW1BZG1pbiIsInN0dWRlbnQiLCJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJhZDhkMmE0Mi04MDNkLTQxYWEtOWI4Yi1mNmQ5ZWVmMjViNzIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiIxYzgzYzM0YS00NmM1LTRmYTEtOGY5MS1iYWE0NzI3OWU0MTciLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInN5c3RlbUFkbWluIiwic3R1ZGVudCIsInVzZXIiXX0sIm5hbWUiOiJBcmlmIFN5c3RlbUFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXJpZnRlayIsImdpdmVuX25hbWUiOiJBcmlmIiwiZmFtaWx5X25hbWUiOiJTeXN0ZW1BZG1pbiIsImVtYWlsIjoiYXJpZnRla0B5b3BtYWlsLmNvbSJ9.XJyhrqD2za7OKNfxBnBzS8g-NUUscDvGP8xG1JZUjhubYUgmNE-L8OdUcvuIKBz-1-ZQ5jPQ5PmdOoDHLfjtUDv_QnICO0wMCP5EA3PuE7f34yapZrYphSWI4l21-CLNQLLDYgdzECh4E4H3FYgKDvFV2tW5TEQfZs0-Y9k1om-kyOx7PtTqQm5wMPgvM-2dzFwr9_7ABFX5LUcmokdq03EGQ1Z5vs7pv0llGSr6B8nVEwbau36JAFTDv_vX9_6xGHJXWoVH3L4Fj0xw_UlnkdM0l2mDBFL72jduz7SCzZiRzzmrFCOwc56m3YvLMIpHMuChqiWgQZqDGAhcvqmFvg",
    Connection: "keep-alive",
    "Content-Type": "application/json",
  };

  const jsonData = {
    name: data.firstName,
    username: data.userName,
    email: data.email,
    mobile: data.mobile,
    gender: data.gender,
    dateOfBirth: data.dob,
    board: data.board,
    password: data.password,
    status: "true",
    groups: ["902a1e66-4c49-4240-b62f-7987c5af8cc9"],
    religion: data.religion,
    schoolUdise: data.udise,
    caste: data.caste,
    annualIncome: data.annualIncome,
    motherEducation: data.motherEducation,
    fatherEducation: data.fatherEducation,
    motherOccupation: data.motherOccupation,
    fatherOccupation: data.fatherOccupation,
    noOfSiblings: data.siblings,
  };

  let result;
  await axios({
    method: "POST",
    url: studentRegister,
    data: jsonData,
    headers: headers,
  })
    .then((res) => {
      console.log(res);
      // console.log(res.data);
      console.log(res.data.data.studentId);
      console.log(res.data.data.userId);

      localStorage.setItem("studentId", res.data.data.studentId);
      localStorage.setItem("userId", res.data.data.userId);

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

export default studentAPI;
