import api from "./apiConfig";

// Signup
export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Signup failed",
      }
    );
  }
};

// Login
export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
};

// Get current user (protected route example)
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch user",
      }
    );
  }
};