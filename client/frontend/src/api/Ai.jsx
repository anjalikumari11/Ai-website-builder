import axios from "axios";

export const generateWebsite = async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/ai/create",
    formData
  );

  return response.data;
};