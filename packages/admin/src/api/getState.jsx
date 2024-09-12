// src/api/getState.jsx
import axios from 'axios';

export const fetchStates = async (token) => {
  try {
    const response = await axios.post(
      "https://alt-dev.uniteframework.io/api/v1/student/getStatesList",
      { state: "" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.map((item) => item.state); 
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};
