import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

export const pingBackend = async () => {
  try {
    await axios.get(`${API_URL}/ping`);
    return true;
  } catch (error) {
    console.error("Backend check failed:", error);
    return false;
  }
};

export const pingDatabase = async () => {
  try {
    await axios.get(`${API_URL}/ping`);
    return true;
  } catch (error) {
    console.error("Database check failed:", error);
    return false;
  }
};
