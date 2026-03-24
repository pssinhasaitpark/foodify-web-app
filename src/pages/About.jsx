import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: "secondary.main", mb: 2 }}
          >
            About Foodify
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Fresh, fast, and crafted for your everyday cravings.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Our Story
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Foodify started with a simple idea: make great food accessible
              without compromise. We partner with trusted kitchens and
              independent chefs to deliver meals that feel homemade—hot, fresh,
              and full of flavor.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              From curated menus to real-time tracking, every step is designed
              to keep your day moving and your table full.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              What We Value
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We focus on premium ingredients, responsible sourcing, and a
              delivery experience that feels seamless. Reliability matters, and
              so does taste.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Whether you need a quick lunch or a family-style dinner, Foodify is
              here to make it effortless.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
