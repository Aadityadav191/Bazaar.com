 // User profile APIs

 import api from "./apiConfig";
const API_BASE_URL = "http://localhost:5000/api/user";

/* =====================
   AUTH
===================== */

// SIGNUP
export const signupUser = async (userData) => {
  const response = await api.post("/user/signup", userData);
  return response.data;
};

// Login
export const loginUser = async (loginData) => {
  try{
    const response = await api.post("/user/login", loginData);
  return response.data;
  }
  catch(error){
    console.error("Login error:", error.response || error);
    throw error;
  }
};

/* =====================
   USER CRUD
===================== */

// Get all users
export const getAllUsers = async () => {
  const res = await api.get("/user/allUser");
  return res.data;
};

// Get single user
export const getUserById = async (id) => {
  const res = await api.get(`/user/${id}`);
  return res.data;
};

// Update user (protected)
export const updateUser = async (id, userData) => {
  const response = await api.put(`/user/${id}`, userData);
  return response.data;
};

// Delete user (protected)
export const deleteUser = async (id) => {
  const res = await api.delete(`/user/${id}`);
  return res.data;
};

/* =====================
   PASSWORD
===================== */

export const changePassword = async (id, passwordData) => {
  const response = await api.put(`/user/change-password/${id}`, passwordData);
  return response.data;
};