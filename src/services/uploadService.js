import api from "./apiConfig";

export const uploadProfilePicture = async (file) => {
  try {
    const dataPayload = new FormData();
    dataPayload.append("ProfilePic", file);

    const response = await api.post("/user/upload-profile", dataPayload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const result = response.data;
    console.log("Verified Backend Data Return:", result);
    return result.imageUrl || result.url || result.profilePic || result;
  } catch (error) {
    console.error(
      "Binary payload tracking operational network error:",
      error.response || error,
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to synchronize image file with storage bucket.",
    );
  }
};
