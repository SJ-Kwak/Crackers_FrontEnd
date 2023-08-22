import axios from 'axios';

const API_URL = 'http://43.200.210.160:8080/api/v2';

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (userId, userInfo) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};
