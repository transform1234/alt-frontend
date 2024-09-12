import axios from 'axios';
import { getStateList, getDistrictList, getBlockList, getSchoolList, getClassList } from '../routes/links';

export const fetchStates = async (token) => {
  try {
    const response = await axios.post(
      getStateList,
      { state: "" },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.state);
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

export const fetchDistricts = async (token, state = "") => {
  try {
    const response = await axios.post(
      getDistrictList,
      { state },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.district);
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

export const fetchBlocks = async (token, district = "") => {
  try {
    const response = await axios.post(
      getBlockList,
      { district },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.block);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};

export const fetchSchools = async (token, block = "") => {
  try {
    const response = await axios.post(
      getSchoolList,
      { block },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.name);
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

export const fetchClasses = async (token, schoolName = "") => {
  try {
    const response = await axios.post(
      getClassList,
      { schoolName },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }}
    );
    return response.data.data.map(item => item.name);
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
