import React from "react";
import { Box, Typography, Container, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper", // Use theme paper for consistency
        color: "text.primary",
        pt: { xs: 8, md: 10 },
        pb: 6,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  mb: 2,
                  letterSpacing: "-0.5px",
                }}
              >
                Foodify
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  mb: 3,
                  maxWidth: "260px",
                }}
              >
                Elevating your dining experience with premium ingredients and
                lightning-fast delivery. Your favorite meals, just a tap away.
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
                {[FacebookIcon, TwitterIcon, InstagramIcon].map(
                  (Icon, index) => (
                    <IconButton
                      key={index}
                      sx={{
                        color: "text.primary",
                        bgcolor: "background.default",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": {
                          bgcolor: "primary.main",
                          color: "white",
                          transform: "translateY(-3px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  ),
                )}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {[
                  { label: "Home", to: "/" },
                  { label: "Menu", to: "/#choose-your-meal" },
                  { label: "About Us", to: "/about" },
                  { label: "Contact", to: "/contact" },
                  { label: "Blog", to: "/blog" },
                ].map((item) => (
                  <Typography
                    key={item.label}
                    component={Link}
                    to={item.to}
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "primary.main",
                        pl: 1,
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Opening Hours
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  color: "text.secondary",
                }}
              >
                <Typography variant="body2">Monday - Friday</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  10:00 AM - 11:00 PM
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">Saturday - Sunday</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", fontWeight: 600 }}
                  >
                    09:00 AM - 12:00 PM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Get in Touch
              </Typography>
              <Box
                sx={{
                  color: "text.secondary",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="body2">
                  123 Foodie Street, Flavor Town,
                  <br />
                  NY 10001, United States
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", fontWeight: 700 }}
                >
                  support@Foodify.com
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                  }}
                >
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 8,
            pt: 4,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              opacity: 0.5,
              letterSpacing: "1px",
              fontSize: "0.75rem",
            }}
          >
            © {new Date().getFullYear()} Foodify. TAILORED WITH PASSION. ALL
            RIGHTS RESERVED.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
