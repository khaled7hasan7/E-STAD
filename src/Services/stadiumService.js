import axios from "axios";
import authService from "./authService.js"; // Import authService for token management

// Base URL for the API
const BASE_URL = "http://localhost:8080/owner";

// Stadium Service
const stadiumService = {
  // Add a stadium
  async addStadium(stadium, mainImage, additionalImages) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const formData = new FormData();
      formData.append("stadium", JSON.stringify(stadium)); // Add stadium JSON as text
      formData.append("mainImage", mainImage); // Add the main image

      if (additionalImages && additionalImages.length > 0) {
        additionalImages.forEach(
          (image) => formData.append("additionalImages", image) // Add additional images
        );
      }

      // Send the request with the Authorization header
      const response = await axios.post(`${BASE_URL}/add-stadium`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
      });

      return response.data; // Return the response data
    } catch (error) {
      console.error("Error in addStadium:", error); // Log errors
      throw error;
    }
  },

  // Get all stadiums for the logged-in owner
  async getAllStadiums() {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await axios.get(`${BASE_URL}/all-stadium`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in getAllStadiums:", error);
      throw error;
    }
  },

  // Search stadiums
  async searchStadiums(query) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await axios.get(`${BASE_URL}/search-stadium`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
        params: { query },
      });

      return response.data;
    } catch (error) {
      console.error("Error in searchStadiums:", error);
      throw error;
    }
  },

  // Get stadium details by ID
  async getStadiumById(stadiumId) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await axios.get(`${BASE_URL}/get-stadium/${stadiumId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in getStadiumById:", error);
      throw error;
    }
  },

  // Delete a stadium
  async deleteStadium(stadiumId) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await axios.delete(
        `${BASE_URL}/delete-stadium/${stadiumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Set the token
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error in deleteStadium:", error);
      throw error;
    }
  },

  // Upload an image
  async uploadImage(image) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(`${BASE_URL}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in uploadImage:", error);
      throw error;
    }
  },

  // Fetch customer details by user ID
  async getCustomerById(userId) {
    try {
      const { accessToken } = authService.getAuthData(); // Get token from authService
      if (!accessToken) throw new Error("User is not authenticated");

      const response = await axios.get(`${BASE_URL}/customer/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error in getCustomerById:", error);
      throw error;
    }
  },
};

export default stadiumService;
