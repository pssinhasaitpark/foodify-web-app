import React from "react";
import { Box, Typography, Container, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    review:
      "The best food delivery service I have ever used. The food arrives hot and the interface is incredibly easy to use.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Davis",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    review:
      "Foodify has completely changed my lunch routine. Fast delivery every single time.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Student",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    review:
      "I love the variety of options available. The discounts are great and the service is top-notch.",
    rating: 4.5,
  },
];

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 14,
        bgcolor: "background.default",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ mb: 10, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Our Customers{" "}
            <Box component="span" sx={{ color: "#FF6B00" }}>
              Feedback
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mt: 2, fontWeight: 400 }}
          >
            We take pride in every meal we deliver. Here's what our community
            has to say about their experience.
          </Typography>
        </Box>

        {/* Forced Single Row Layout */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "center",
            flexWrap: { xs: "nowrap" }, // STRICTLY FORCE ONE LINE
            overflowX: { xs: "auto", md: "visible" }, // Permit scroll on tiny screens but stay side-by-side
            pb: 2,
          }}
        >
          {testimonialsData.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                flex: "1 1 33.333%",
                minWidth: { xs: "280px", md: "0" }, // Prevent shrinking too small
                display: "flex",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ width: "100%", display: "flex" }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "40px",
                    bgcolor: "background.paper",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid rgba(0,0,0,0.02)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.08)",
                      bgcolor: "background.default",
                      borderColor: "rgba(255,107,0,0.1)",
                    },
                  }}
                >
                  {/* Profile Row */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Avatar
                      src={item.avatar}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      }}
                    />

                    <Box>
                      <Typography variant="subtitle1" fontWeight={800}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ opacity: 0.8 }}
                      >
                        {item.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Rating
                      value={item.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ color: "#FFB800" }}
                    />
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      color: "text.primary",
                      fontStyle: "italic",
                      opacity: 0.9,
                      flexGrow: 1,
                    }}
                  >
                    "{item.review}"
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
