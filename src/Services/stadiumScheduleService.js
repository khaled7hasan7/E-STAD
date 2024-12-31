import axios from "axios";
import authService from "./authService.js"; // Import authService for token management

const BASE_URL = "http://localhost:8080/owner";

const stadiumScheduleService = {
    // Add or update a recurring schedule
    async addSchedule(schedule) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.post(`${BASE_URL}/add-schedule`, schedule, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in addSchedule:", error);
            throw error;
        }
    },

    // Add or update a specific date override
    async addDateOverride(override) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.post(`${BASE_URL}/add-override`, override, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in addDateOverride:", error);
            throw error;
        }
    },

    // Fetch schedules for a specific stadium
    async getSchedules(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.get(`${BASE_URL}/stadium/schedules/${stadiumId}`, {
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

    // Fetch date overrides for a specific stadium
    async getDateOverrides(stadiumId) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.get(`${BASE_URL}/stadium/overrides/${stadiumId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in getDateOverrides:", error);
            throw error;
        }
    },

    // Delete a recurring schedule by ID
    async deleteSchedule(scheduleId) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.delete(`${BASE_URL}/delete-schedule/${scheduleId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in deleteSchedule:", error);
            throw error;
        }
    },

    // Delete a date override by ID
    async deleteDateOverride(overrideId) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.delete(`${BASE_URL}/delete-override/${overrideId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error in deleteDateOverride:", error);
            throw error;
        }
    },

    // Get hourly availability for a stadium on a specific date
    async getHourlyAvailability(stadiumId, date) {
        try {
            const { accessToken } = authService.getAuthData();
            if (!accessToken) throw new Error("User is not authenticated");

            const response = await axios.get(`${BASE_URL}/stadium/availability/${stadiumId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: { date },
            });

            return response.data;
        } catch (error) {
            console.error("Error in getHourlyAvailability:", error);
            throw error;
        }
    },
};

export default stadiumScheduleService;
