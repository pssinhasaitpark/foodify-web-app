import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";

const posts = [
  {
    title: "5 Quick Lunch Ideas That Don’t Compromise on Flavor",
    excerpt:
      "From grain bowls to wraps, discover easy picks that feel indulgent but keep your day on track.",
  },
  {
    title: "How We Source Ingredients for Peak Freshness",
    excerpt:
      "A behind-the-scenes look at the partners and practices that keep every bite vibrant.",
  },
  {
    title: "Dinner in 30: Family Favorites Made Simple",
    excerpt:
      "Comfort food, streamlined. These crowd-pleasers are fast, filling, and always a win.",
  },
];

const Blog = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: "secondary.main", mb: 2 }}
          >
            Foodify Blog
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Tips, stories, and food inspiration—freshly served.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid item xs={12} md={4} key={post.title}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-6px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
