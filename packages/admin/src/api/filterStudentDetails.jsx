import axios from 'axios';
import { getStateList, getDistrictList, getBlockList, getSchoolList, getClassList } from '../routes/links';

// Fetch states (no change needed here)
export const fetchStates = async (token) => {
  try {
    const response = await axios.post(
      getStateList,
      { state: "" }, // Fetch all states
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.state);
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

// Fetch districts based on state
export const fetchDistricts = async (token, state = "") => {
  try {
    const response = await axios.post(
      getDistrictList,
      { state }, // Send selected state as payload
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.district);
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

// Fetch blocks based on district
export const fetchBlocks = async (token, state = "", district = "") => {
  try {
    const response = await axios.post(
      getBlockList,
      { state, district }, // Send both state and district as payload
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.block);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};

// Fetch schools based on state, district, and block
export const fetchSchools = async (token, state = "", district = "", block = "") => {
  try {
    const response = await axios.post(
      getSchoolList,
      { state, district, block }, // Send state, district, and block as payload
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.name);
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

// Fetch classes based on school name
export const fetchClasses = async (token, schoolName = "") => {
  try {
    const response = await axios.post(
      getClassList,
      { schoolName }, // Send selected schoolName as payload
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.name);
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
