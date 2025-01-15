import axios from 'axios';

const BASE_URL = 'http://localhost:8080/auth'; // Replace with your backend URL

// Create an Axios instance for the service
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set Authorization header
const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

// Function to store tokens and role in localStorage
const storeAuthData = ({ access_token, refresh_token, role }) => {
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    localStorage.setItem("userRole", role);
};


// Function to clear stored authentication data
const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    setAuthToken(null); // Clear token from headers
};

const authService = {
    login: async (loginDTO) => {
        try {
            const response = await apiClient.post("/login", loginDTO);
            const data = response.data;

            // Store tokens and role in localStorage
            storeAuthData(data);

            // Set Authorization header with the access token
            setAuthToken(data.access_token);
            console.log(data.access_token);
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    registerCustomer: async (user) => {
        try {
            const { accessToken } = getAuthData();
            setAuthToken(accessToken); // Attach token
            const response = await apiClient.post("/register-customer", user);
            return response.data;
        } catch (error) {
            console.error('Error during customer registration:', error);
            throw error;
        }
    },

    registerOwner: async (user) => {
        try {
            console.log("WOROOD ASSI IS YOUR UNCLE")
            const { accessToken } = getAuthData();
            setAuthToken(accessToken); // Attach token
            const response = await apiClient.post("/register-owner", user);
            return response.data;
        } catch (error) {
            console.error('Error during owner registration:', error);
            throw error;
        }
    },

    registerAdmin: async (user) => {
        try {
            const { accessToken } = getAuthData();
            setAuthToken(accessToken); // Attach token
            const response = await apiClient.post("/register-admin", user);
            return response.data;
        } catch (error) {
            console.error('Error during admin registration:', error);
            throw error;
        }
    },

    getUser: async () => {
        try {
            const { accessToken } = getAuthData();
            setAuthToken(accessToken); // Attach token
            const response = await apiClient.get("/getUser");
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    // // Utility function to check if the logged-in user has a specific role
    // hasRole: (role) => {
    //     const { userRole } = getAuthData();
    //     return userRole === role;
    // },

    logout: () => {
        clearAuthData();
    },

    getStoredRole: () => {
        return localStorage.getItem('userRole');
    },

    getStoredAccessToken: () => {
        return localStorage.getItem('accessToken');
    },

    getStoredRefreshToken: () => {
        return localStorage.getItem('refreshToken');
    },

    getAuthData: () => {
        return {
            accessToken: localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken"),
            userRole: localStorage.getItem("userRole"),
        };
    },

};

export default authService;
