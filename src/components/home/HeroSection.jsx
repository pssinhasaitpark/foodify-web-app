import React from "react";
import { Box, Typography, Container, Grid, useTheme } from "@mui/material";
import CustomButton from "../common/CustomButton";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    const target = document.getElementById("popular-restaurants");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/#popular-restaurants");
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Background Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          backgroundColor:
            theme.palette.mode === "light" ? "#FFF4E5" : "rgba(255,107,0,0.08)",
          borderRadius: "50%",
          zIndex: 0,
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "400px",
          height: "400px",
          backgroundColor:
            theme.palette.mode === "light" ? "#FFF0F0" : "rgba(255,107,0,0.05)",
          borderRadius: "50%",
          zIndex: 0,
          filter: "blur(80px)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mb: 3,
                  px: 2,
                  py: 1,
                  borderRadius: "50px",
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "#FFF4E5"
                      : "rgba(255,107,0,0.15)",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  🔥 Best Food Delivery App
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3.5rem", md: "5.5rem" },
                  color: "secondary.main",
                  mb: 2,
                  lineHeight: 1,
                }}
              >
                Eat <span style={{ color: "#FF6B00" }}>Fresh</span> <br />
                Eat <span style={{ color: "#FF6B00" }}>Healthy</span>
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 5,
                  fontWeight: 400,
                  maxWidth: "500px",
                  lineHeight: 1.6,
                }}
              >
                Experience the finest culinary creations delivered straight to
                your door. Fresh ingredients, masterful chefs, and
                lightning-fast delivery.
              </Typography>

              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <CustomButton
                  size="large"
                  sx={{ px: 5, py: 2, fontSize: "1.1rem" }}
                  onClick={handleGetStarted}
                >
                  Get Started
                </CustomButton>
                {/* <CustomButton
                  variant="outlined"
                  size="large"
                  color="secondary"
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: "1.1rem",
                  }}
                >
                  See How It Works
                </CustomButton> */}
              </Box>

              <Box sx={{ mt: 8, display: "flex", gap: 4 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    15k+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Happy Customers
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    500+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Top Chefs
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    100+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cities Covered
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080"
                alt="Premium Salad Bowl"
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", // Blob shape
                  boxShadow: "0 50px 100px rgba(0,0,0,0.1)",
                  zIndex: 2,
                  position: "relative",
                }}
              />

              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "-10%",
                  backgroundColor:
                    theme.palette.mode === "light" ? "white" : "#1E1E1E",
                  padding: "15px 25px",
                  borderRadius: "20px",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 20px 40px rgba(0,0,0,0.1)"
                      : "0 20px 40px rgba(0,0,0,0.4)",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "#FFF4E5"
                        : "rgba(255,107,0,0.2)",
                    p: 1,
                    borderRadius: "12px",
                  }}
                >
                  🍕
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={800}>
                    Fast Delivery
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Within 30 mins
                  </Typography>
                </Box>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "-5%",
                  backgroundColor:
                    theme.palette.mode === "light" ? "white" : "#1E1E1E",
                  padding: "15px 25px",
                  borderRadius: "20px",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 20px 40px rgba(0,0,0,0.1)"
                      : "0 20px 40px rgba(0,0,0,0.4)",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  border: `1px solid ${theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "#E5F9F1"
                        : "rgba(0,255,150,0.1)",
                    p: 1,
                    borderRadius: "12px",
                  }}
                >
                  🥬
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={800}>
                    Healthy Food
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    100% Fresh
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
