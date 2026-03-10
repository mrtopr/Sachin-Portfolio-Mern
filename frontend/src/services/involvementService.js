import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

// Fetch all involvements
export const fetchInvolvements = async () => {
  try {
    const response = await axios.get(`${API_URL}/getinvolvements`);
    return response.data;
  } catch (error) {
    console.error("Error fetching involvements:", error);
    throw error;
  }
};

// Fetch a specific involvement by involvementLink
export const fetchInvolvementByLink = async (involvementLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/getinvolvements/${involvementLink}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching involvement by link:", error);
    throw error;
  }
};
