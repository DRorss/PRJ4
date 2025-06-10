import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(sessionStorage.getItem("infoUser"))?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
