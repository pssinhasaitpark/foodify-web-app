import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { profileService } from "../services/profileService";
import { setCredentials } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { token, refreshToken } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    mobile: "",
  });

  const extractUser = (response) =>
    response?.data?.user ||
    response?.data?.data ||
    response?.data ||
    response?.user ||
    response;

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await profileService.getProfile();
      const user = extractUser(response);
      setProfile(user);
      setForm({
        full_name: user?.full_name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        full_name: form.full_name,
        mobile: form.mobile,
      };
      const response = await profileService.updateProfile(payload);
      const user = extractUser(response);
      setProfile(user);
      dispatch(setCredentials({ user, token, refreshToken }));
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    setError("");
    setSuccess("");
    try {
      const response = await profileService.updateProfileImage(file);
      const user = extractUser(response);
      setProfile(user);
      dispatch(setCredentials({ user, token, refreshToken }));
      setSuccess("Profile image updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account details
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
            {success}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  src={profile?.profile_image || ""}
                  sx={{ width: 96, height: 96, bgcolor: "primary.light" }}
                />
              </Box>
              <Button
                component="label"
                variant="outlined"
                disabled={imageUploading}
                sx={{ borderRadius: "20px", py: 1.2 }}
              >
                {imageUploading ? "Uploading..." : "Change Profile Image"}
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>

              <TextField
                label="Full Name"
                value={form.full_name}
                onChange={handleChange("full_name")}
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
              />
              <TextField
                label="Email"
                value={form.email}
                fullWidth
                disabled
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
              />
              <TextField
                label="Mobile"
                value={form.mobile}
                onChange={handleChange("mobile")}
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "16px" } }}
              />
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={saving}
                sx={{ borderRadius: "20px", py: 1.6, fontWeight: 800 }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
