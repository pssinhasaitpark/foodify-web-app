import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import CustomButton from "../components/common/CustomButton";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: onlyDigits });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.full_name.trim()) errors.full_name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (formData.mobile.length !== 10) {
      errors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const extractApiErrors = (err) => {
    const responseErrors = err.response?.data?.errors || {};
    const nonFieldErrors = responseErrors.non_field_errors || [];
    const firstFieldError =
      responseErrors.email?.[0] ||
      responseErrors.mobile?.[0] ||
      responseErrors.password?.[0] ||
      responseErrors.full_name?.[0];
    const message =
      nonFieldErrors[0] ||
      firstFieldError ||
      err.response?.data?.message ||
      "An error occurred during registration";
    setFieldErrors({
      ...fieldErrors,
      email: responseErrors.email?.[0],
      mobile: responseErrors.mobile?.[0],
      password: responseErrors.password?.[0],
      full_name: responseErrors.full_name?.[0],
    });
    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await authService.register(formData);
      if (response.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError(extractApiErrors(err));
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.full_name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.mobile.length === 10 &&
    formData.password.length >= 8;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 2, fontWeight: 800, color: "secondary.main" }}
        >
          Create <span style={{ color: "#FF6B00" }}>Account</span>
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Join us and start ordering your favorite food
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: "12px" }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, maxWidth: 800, mx: "auto" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              error={Boolean(fieldErrors.full_name)}
              helperText={fieldErrors.full_name || " "}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                "& .MuiFormHelperText-root": { minHeight: "20px" },
                "& .MuiOutlinedInput-input": { py: "14px" },
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email || " "}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                "& .MuiFormHelperText-root": { minHeight: "20px" },
                "& .MuiOutlinedInput-input": { py: "14px" },
              }}
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              inputProps={{ inputMode: "numeric" }}
              error={Boolean(fieldErrors.mobile)}
              helperText={fieldErrors.mobile || "Enter 10-digit number"}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                "& .MuiFormHelperText-root": { minHeight: "20px" },
                "& .MuiOutlinedInput-input": { py: "14px" },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password || "Minimum 8 characters"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "16px" },
                "& .MuiFormHelperText-root": { minHeight: "20px" },
                "& .MuiOutlinedInput-input": { py: "14px" },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CustomButton
              type="submit"
              disabled={loading || !isFormValid}
              sx={{ py: 2, px: 8, fontSize: "1.1rem", minWidth: "250px" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </CustomButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
          Already have an account?{" "}
          <Box
            component="span"
            onClick={() => navigate("/login")}
            sx={{
              color: "primary.main",
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Login
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
