// src/api/getDistrict.jsx
import axios from 'axios';

export const fetchDistricts = async (token, state = "") => {
  try {
    const response = await axios.post(
      "https://alt-dev.uniteframework.io/api/v1/student/getDistrictList",
      { state: state }, // Sending state in the payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Extract 'district' field from the response and return the cleaned up values
    return response.data.data.map((item) => item.district);
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};
