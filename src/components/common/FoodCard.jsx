import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          width: "100%", // FORCE FULL WIDTH
          display: "flex",
          flexDirection: "column",
          position: "relative",
          bgcolor: "background.paper",
          borderRadius: "32px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ position: "relative", width: "100%" }}>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 180, md: 220 },
              width: "100%",
              objectFit: "cover",
            }}
            image={item.image}
            alt={item.name}
          />
          {item.rating >= 4.8 && (
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                bgcolor: "rgba(255,107,0,0.9)",
                color: "white",
                px: 2,
                py: 0.5,
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "0.75rem",
                backdropFilter: "blur(4px)",
                zIndex: 1,
              }}
            >
              POPULAR ✨
            </Box>
          )}
        </Box>
          <CardContent
          sx={{
            flexGrow: 1,
            width: "100%",
            px: 3,
            pb: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title and Rating Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
              minHeight: "52px", // Safe space for titles
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flexGrow: 1,
                mr: 1,
              }}
            >
              {item.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Rating
                value={item.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </Box>
          </Box>

          {/* Description Section */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              minHeight: "66px", // Safe space for descriptions
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
              opacity: 0.8,
            }}
          >
            {item.description}
          </Typography>

          {/* Footer Section */}
          <Box
            sx={{
              mt: "auto", // Push to bottom
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 1,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#FF6B00" }}>
              ${item.price.toFixed(2)}
            </Typography>
            <CustomButton
              onClick={handleAddToCart}
              size="medium"
              sx={{
                minWidth: "auto",
                p: "8px 20px",
                background: "linear-gradient(135deg,#ff8a34,#ff5a00)",
                color: "white",
                boxShadow: "0 10px 28px rgba(255,90,0,0.15)",
              }}
            >
              + ADD
            </CustomButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FoodCard;
