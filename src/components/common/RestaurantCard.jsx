import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RestaurantCard = ({ restaurant }) => {
  const isOpen = restaurant.is_open;

  return (
    <motion.div
      whileHover={{ y: isOpen ? -10 : 0, scale: isOpen ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={{ height: "100%", width: "100%" }}
    >
      <Card
        component={Link}
        to={`/restaurant/${restaurant.id}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "40px",
          overflow: "hidden",
          bgcolor: "background.paper",
          boxShadow: "0 15px 45px rgba(0,0,0,0.06)",
          position: "relative",
          filter: isOpen ? "none" : "grayscale(80%)",
          opacity: isOpen ? 1 : 0.85,
          textDecoration: "none",
          color: "inherit",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid",
          borderColor: "rgba(0,0,0,0.04)",
          "&:hover": {
            boxShadow: "0 25px 60px rgba(255,107,0,0.12)",
            borderColor: "rgba(255,107,0,0.2)",
            "& .card-media-img": {
              transform: "scale(1.1)",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden", p: 1.5, pb: 0 }}>
          <Box sx={{ borderRadius: "30px", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={restaurant.image_url}
              alt={restaurant.name}
              className="card-media-img"
              sx={{
                height: 220,
                objectFit: "cover",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </Box>

          {!isOpen && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                borderRadius: "30px",
                m: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 900,
                  letterSpacing: 2,
                  bgcolor: "rgba(0,0,0,0.5)",
                  px: 3,
                  py: 1,
                  borderRadius: "50px",
                }}
              >
                CLOSED
              </Typography>
            </Box>
          )}

          {restaurant.rating >= 4.5 && isOpen && (
            <Chip
              label="★ TOP RATED"
              size="small"
              sx={{
                position: "absolute",
                top: 25,
                left: 25,
                bgcolor: "#FF6B00",
                color: "white",
                fontWeight: 900,
                fontSize: "0.75rem",
                boxShadow: "0 4px 12px rgba(255,107,0,0.4)",
                border: "2px solid white",
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3, pt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {restaurant.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                bgcolor: "rgba(76, 175, 80, 0.1)",
                px: 1,
                py: 0.5,
                borderRadius: "10px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 900, color: "#2e7d32" }}
              >
                {restaurant.rating}
              </Typography>
              <Rating
                value={1}
                max={1}
                readOnly
                size="small"
                sx={{ color: "#2e7d32" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 1.5,
              color: "text.secondary",
            }}
          >
            <LocationOnIcon sx={{ fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {restaurant.city}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "40px",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            {restaurant.cuisine}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 2.5,
              borderTop: "2px dashed",
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,107,0,0.1)",
                  p: 0.8,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <DeliveryDiningIcon
                  color="primary"
                  sx={{ fontSize: "1.2rem" }}
                />
              </Box>
              <Typography variant="body2" fontWeight={800} color="text.primary">
                {restaurant.delivery_time}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon
                sx={{ fontSize: "1rem", color: "text.secondary" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
              >
                {restaurant.opening_time} - {restaurant.closing_time}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RestaurantCard;
