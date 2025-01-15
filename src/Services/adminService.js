import axios from "axios";
import authService from "./authService.js"; // Import authService for token management

const BASE_URL = "http://localhost:8080/admin";

const adminService = {
    // Approve a stadium
    async approveStadium(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.put(`${BASE_URL}/approve/${stadiumId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in approveStadium:", error);
            throw error;
        }
    },

    // Cancel a stadium
    async cancelStadium(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.put(`${BASE_URL}/cancel/${stadiumId}`, null, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in cancelStadium:", error);
            throw error;
        }
    },

    // Get stadium details by ID
    async getStadiumById(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/get-stadium/${stadiumId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getStadiumById:", error);
            throw error;
        }
    },

    // Fetch all stadiums for admin
    async getAllStadiums() {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/all-stadiums`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getAllStadiums:", error);
            throw error;
        }
    },

    // Fetch schedules for a stadium
    async getSchedules(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/get-stadium-schedule/${stadiumId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getSchedules:", error);
            throw error;
        }
    },

    // Fetch pending stadiums
    async getPendingStadiums() {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/stadiums/pending`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getPendingStadiums:", error);
            throw error;
        }
    },

    // Fetch approved stadiums
    async getApprovedStadiums() {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/stadiums/approved`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getApprovedStadiums:", error);
            throw error;
        }
    },

    // Fetch rejected stadiums
    async getRejectedStadiums() {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/stadiums/rejected`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getRejectedStadiums:", error);
            throw error;
        }
    },

    // Fetch stadium details with owner info
    async getStadiumWithOwner(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            const response = await axios.get(`${BASE_URL}/stadiums/${stadiumId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getStadiumWithOwner:", error);
            throw error;
        }
    },
};

export default adminService;
