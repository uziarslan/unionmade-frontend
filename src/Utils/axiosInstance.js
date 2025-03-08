import axios from "axios";

const baseURL = process.env.NODE_ENV === "production" 
  ? process.env.REACT_APP_API_URL_LIVE 
  : process.env.REACT_APP_END_POINT;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
