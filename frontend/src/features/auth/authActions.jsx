import axios from 'axios';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`/api/register`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
    }
};

// Login User
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`/api/login`, userData);
        return response.data;
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
    }
};

// Logout User
export const logoutUser = async () => {
    try {
        await axios.get(`/api/logout`);
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
    }
};

// Logout User
export const loginStatus = async () => {
    try {
        const response = await axios.get('/api/login-status');
        return response.data;
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
    }
};

export const infoUser = async () => {
    try {
        const response = await axios.get('/api/user');
        return response.data;
    } catch (error) {
        const message = error.response.data.message
        console.log(message);
    }
};