import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import { setCredentials } from "../features/auth/authSlice";
import CustomButton from "../components/common/CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const accessToken = response.data?.tokens?.access || response.data?.token;
        const refreshToken = response.data?.tokens?.refresh;
        dispatch(
          setCredentials({
            user: response.data.user,
            token: accessToken,
            refreshToken,
          }),
        );
        navigate("/");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      const responseErrors = err.response?.data?.errors || {};
      const nonFieldErrors = responseErrors.non_field_errors || [];
      const firstFieldError =
        responseErrors.email?.[0] || responseErrors.password?.[0];
      setFieldErrors({
        email: responseErrors.email?.[0],
        password: responseErrors.password?.[0],
      });
      setError(
        nonFieldErrors[0] ||
          firstFieldError ||
          err.response?.data?.message ||
          "An error occurred during login",
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    password.length >= 8;

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
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
          Welcome <span style={{ color: "#FF6B00" }}>Back</span>
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          Login to your account to continue ordering
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
              },
            }}
          />
          <CustomButton
            fullWidth
            type="submit"
            disabled={loading || !isFormValid}
            sx={{ py: 2, fontSize: "1.1rem" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </CustomButton>
        </Box>

        <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
          Don't have an account?{" "}
          <Box
            component="span"
            onClick={() => navigate("/signup")}
            sx={{
              color: "primary.main",
              fontWeight: 700,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign Up
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
