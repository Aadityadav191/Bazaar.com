import { toast } from "react-toastify";
import api from "./apiConfig";

/* ===================== AUTH ===================== */

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

/* ===================== USER CRUD ===================== */


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

/* ===================== PASSWORD ===================== */

export const changeUserPassword = async (userId, passwordPayload) => {
  if (!userId) {
    throw new Error("Target User Identification ID is undefined or missing. Ensure you are passing user._id or user.id correctly.");
  }
  try {
    const response = await fetch(`http://localhost:5000/api/user/change-password/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", // Explicitly request a JSON fallback from Express
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
      },
      body: JSON.stringify({
        oldPassword: passwordPayload.oldPassword,
        newPassword: passwordPayload.newPassword
      }),
    });

    const textData = await response.text();
    
    let data;
    try {
      data = JSON.parse(textData);
    } catch (parseError) {
      // PRINT OUT EXPLICITLY THE HTML RECEIVED FOR DIRECT VISIBILITY
      console.error("--- SERVER CRASH ERROR SCREENSHOT PRINT ---");
      console.error(textData); 
      console.error("-------------------------------------------");
      
      if (textData.includes("Cannot POST")) {
        throw new Error(`Route mismatch: Your backend does not have a POST endpoint registered at this exact path. Check for pluralization (e.g., /api/users vs /api/user).`);
      }
      throw new Error("The backend system crashed or returned a 404 HTML layout page instead of structured JSON.");
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to alter security credential layout mapping.");
    }

    return data;
  } catch (error) {
    console.error("Critical service exception:", error);
    throw error;
  }
};


/* ===================== PROFILE IMAGE UPLOAD ===================== */

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
    return data.url || data.profilePic || data.imageUrl || data.image || null;
  } catch (error) {
    toast.error("Image upload failed");
    console.error("Upload error:", error.response || error);
    throw new Error("Image upload failed");
  }
};
