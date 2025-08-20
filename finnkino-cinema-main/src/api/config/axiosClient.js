import axios from "axios";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.request.use(

  (config) => {
    const user = sessionStorage.getItem("infoUser") && JSON.parse(sessionStorage.getItem("infoUser"));
    if (user) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
  //Promise.reject(error.response.data.content),
);

export default axiosClient;
