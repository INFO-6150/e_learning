import axios from 'axios';
import { API_BASE_URL } from '../../config'; // Make sure you have the config file set up to export the API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const register = async (userData, file) => {
  const formData = new FormData();
  Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
  if (file) {
    formData.append('image', file);
  }

  try {
    const response = await api.post('/user/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    // Handle errors better in production code
    throw error;
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await api.post('/user/findEmail', { email });
    return response; // This will return success if the email is not in use
  } catch (error) {
    // If there's an error (e.g., email is in use), this will be thrown
    throw error;
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

// Inside api.js
export const fetchUserDetails = async (userId) => {
  try {
    const response = await api.post(`/user/findById/${userId}`);
    return response.data; // Assuming the server responds with the data in the 'data' key
  } catch (error) {
    // In a real app, you'd want more sophisticated error handling
    throw error;
  }
};

// Inside api.js
export const updateUserDetails = async (userId, formData) => {
  try {
    const response = await api.put(`/user/update/${userId}`, formData, {
      headers: {
        // 'Content-Type': 'multipart/form-data' is not needed here; axios sets it automatically when you provide a FormData object
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchCourses = async () => {
  try {
    const response = await api.get('/api/courses/');
    return response.data; // Assuming the server responds with the courses in the 'data' key
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (userId, passwordData) => {
  try {
    const response = await api.put(`/user/updatePassword/${userId}`, passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const viewAllCourses = async (professorId) => {
  try {
    
    const response = await api.get(`/api/courses/professor/${professorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCourseDetails = async (courseId) => {
  try {
    const response = await api.get(`/api/courses/${courseId}`);
    return response.data; // Assuming the server responds with the course details in the 'data' key
  } catch (error) {
    throw error;
  }
};

// Function to fetch course videos by course ID
export const fetchCourseVideos = async (courseId) => {
  try {
    const response = await api.get(`/api/courses/${courseId}/videos`);
    return response.data; // Assuming the server responds with the course videos in the 'data' key
  } catch (error) {
    throw error;
  }
};

export const updateCourseDetails = async (courseId, formData) => {
  try {
    const response = await api.put(`/api/courses/update/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Assuming the server responds with the updated course
  } catch (error) {
    throw error;
  }
};

export const uploadVideo = async (courseId, formData) => {
  try {
    const response = await api.post(`/api/courses/uploadVideo/${courseId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
