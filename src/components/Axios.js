import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        'content-Type': 'application/json'
    }
});

export default instance;