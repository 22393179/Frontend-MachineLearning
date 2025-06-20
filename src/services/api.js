import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const predict = async (modelName, inputData) => {
  try {
    const response = await axios.post(
      `${API_URL}/predict/${modelName}`,
      inputData
    );
    return response.data;
  } catch (error) {
    console.error('Error calling API:', error.response?.data || error.message);
    throw error;
  }
};