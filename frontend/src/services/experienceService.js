import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URI}`;

// Fetch all experiences
export const fetchExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/getexperiences`);
    return response.data;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }
};

// Fetch a specific experience by experienceLink
export const fetchExperienceByLink = async (experienceLink) => {
  try {
    const response = await axios.get(
      `${API_URL}/getexperiences/${experienceLink}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching experience by link:", error);
    throw error;
  }
};
