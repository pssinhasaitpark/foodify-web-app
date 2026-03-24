import api from "./api";

export const profileService = {
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile", profileData);
    return response.data;
  },
  updateProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("profile_image", file);
    const response = await api.put("/auth/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
