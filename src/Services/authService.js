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

const authService = {
    login: async (loginDTO) => {
        try {
            const response = await apiClient.post('/login', loginDTO);
            console.log("response",response);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    registerCustomer: async (user, token) => {
        try {
            setAuthToken(token); // Attach token
            const response = await apiClient.post('/register-customer', user);
            return response.data;
        } catch (error) {
            console.error('Error during customer registration:', error);
            throw error;
        }
    },

    registerOwner: async (user, token) => {
        try {
            setAuthToken(token); // Attach token
            const response = await apiClient.post('/register-owner', user);
            return response.data;
        } catch (error) {
            console.error('Error during owner registration:', error);
            throw error;
        }
    },

    registerAdmin: async (user, token) => {
        try {
            setAuthToken(token); // Attach token
            const response = await apiClient.post('/register-admin', user);
            return response.data;
        } catch (error) {
            console.error('Error during admin registration:', error);
            throw error;
        }
    },

    getUser: async (token) => {
        try {
            setAuthToken(token); // Attach token
            const response = await apiClient.get('/getUser');
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
};

export default authService;
