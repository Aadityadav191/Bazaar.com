import api from "./apiConfig";
// import Toast from "react-hot-toast";
/* =====================
AUTH
===================== */

// SIGNUP
export const signupUser = async (userData) => {
  const response = await api.post("/user/signup", userData);
  return response.data;
};

// LOGIN
export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/user/login", loginData);
    return response.data;
  } catch (error) {
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

// Update user
export const updateUser = async (id, userData) => {
  const response = await api.put(`/user/${id}`, userData);
  return response.data;
};

// Delete user
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

/* =====================
   PROFILE IMAGE UPLOAD
===================== */

export const uploadProfileImage = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append("ProfilePic", file); 

    const response = await api.post("/user/upload-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    // normalize backend response
    return data.url || data.profilePic || data.imageUrl || data.image || null;
  } catch (error) {
    // Toast.error("Image upload failed");
    console.error("Upload error:", error.response || error);
    throw new Error("Image upload failed");
  }
};
