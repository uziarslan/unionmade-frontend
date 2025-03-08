import axiosInstance from "./axiosInstance";

const API_URL = "/api/auth";

const register = async (userData) => {
  const headers =
    userData instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : {};
  const response = await axiosInstance.post(`${API_URL}/signup`, userData, {
    headers,
  });
  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

const login = async (userData) => {
  const response = await axiosInstance.post(`${API_URL}/login`, userData);
  console.log("Got response from backend", response);
  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await axiosInstance.get(`${API_URL}/user`);
    return response.data;
  }
  return null;
};

const authService = {
  register,
  login,
  logout,
  getUser,
};

export default authService;
