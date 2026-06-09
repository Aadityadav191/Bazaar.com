import api from "./apiConfig";

export const uploadProfile = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/user/upload-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};