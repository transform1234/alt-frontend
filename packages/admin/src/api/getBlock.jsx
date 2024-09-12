// src/api/getBlock.jsx
import axios from 'axios';

export const fetchBlocks = async (token, district = "") => {
  try {
    const response = await axios.post(
      "https://alt-dev.uniteframework.io/api/v1/student/getBlockList",
      { district: district }, // Send district in the payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // Extract 'block' field from the response and return the cleaned-up values
    return response.data.data.map((item) => item.block);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};
