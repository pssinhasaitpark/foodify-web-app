import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import CustomButton from "../common/CustomButton";
import { motion } from "framer-motion";

const OffersSection = () => {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box
            sx={{
              borderRadius: "40px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              minHeight: 450,
              background: "linear-gradient(135deg, #1A1A1A 0%, #2D3436 100%)",
              color: "white",
              boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
            }}
          >
            {/* Background Image with Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1544025162-831e5055abc8?q=80&w=2070)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
                mixBlendMode: "overlay",
              }}
            />

            <Grid
              container
              spacing={4}
              sx={{ position: "relative", zIndex: 1, p: { xs: 6, md: 10 } }}
            >
              <Grid item xs={12} md={7}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    bgcolor: "primary.main",
                    borderRadius: "50px",
                    mb: 3,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    LIMITED TIME OFFER
                  </Typography>
                </Box>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 800, mb: 3, lineHeight: 1.1 }}
                >
                  Special Offer For <br />
                  <span style={{ color: "#FF6B00" }}>New Customers</span>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 5,
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400,
                    maxWidth: "700px",
                  }}
                >
                  Get 20% off your first order when you sign up today! Use code
                  <Box
                    component="span"
                    sx={{ color: "primary.main", fontWeight: 800, mx: 1 }}
                  >
                    FIRST20
                  </Box>
                  at checkout.
                </Typography>
                <CustomButton
                  size="large"
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: "1.2rem",
                    boxShadow: "0 10px 20px rgba(255,107,0,0.4)",
                  }}
                >
                  Claim Offer Now
                </CustomButton>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [15, 10, 15],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#FF6B00",
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 15px 35px rgba(255,107,0,0.5)",
                      border: "8px solid rgba(255,255,255,0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 900, lineHeight: 1 }}
                    >
                      20%
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      OFF
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OffersSection;
