import axios from "axios";
import { studentSearch } from "../routes/links";
const studentUsernamePasswordAPI = async (person) => {
    const token = sessionStorage.getItem('token');
    console.log("INSIDE API CALL")
    console.log(person);
  
    const apiUrl = studentSearch;
    const headers = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    const requestData = {
      limit: "",
      page: 0,
      filters: { schoolUdise: { eq: person } }
    };
  
    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      console.log("INSIDE API CALL 2");
      console.log(response);
      return response; // Return the response here
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching data:", error);
      return null; // Return null or an error object in case of an error
    }
  };
  
  export default studentUsernamePasswordAPI;
  