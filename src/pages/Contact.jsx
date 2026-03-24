import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

const Contact = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: "secondary.main", mb: 2 }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We’re here to help—reach out anytime.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                support@foodify.com
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                +1 (555) 123-4567
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Foodie Street
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Flavor Town, NY 10001
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "100%",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mon–Fri: 10:00 AM – 11:00 PM
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Sat–Sun: 09:00 AM – 12:00 PM
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
