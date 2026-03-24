import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RestaurantCard from "../common/RestaurantCard";

const PopularDishes = ({ restaurants = [], loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const itemsPerView = useMemo(() => {
    if (isXs) return 1;
    if (isSm) return 2;
    return 3;
  }, [isXs, isSm]);
  const totalItems = restaurants.length;

  const slideNext = useCallback(() => {
    if (totalItems === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const slidePrev = useCallback(() => {
    if (totalItems === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const getVisibleItems = () => {
    const items = [];
    if (totalItems === 0) return items;
    for (let i = 0; i < Math.min(itemsPerView, totalItems); i++) {
      items.push(restaurants[(currentIndex + i) % totalItems]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  if (totalItems === 0) return null;

  return (
    <Box
      id="popular-restaurants"
      sx={{
        py: { xs: 8, md: 15 },
        bgcolor: "background.default",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <Box sx={{ mb: 8, textAlign: "center", position: "relative" }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 800,
            }}
          >
            Our Most{" "}
            <Box component="span" sx={{ color: "#FF6B00" }}>
              Popular Restaurants
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Discover the meals that our customers keep coming back for.
            Handpicked, freshly prepared, and incredibly delicious.
          </Typography>

          {loading && (
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
              }}
            >
              <CircularProgress size={20} color="primary" />
              <Typography variant="body2" fontWeight={600}>
                Filtering...
              </Typography>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              position: { xs: "static", md: "absolute" },
              right: { md: 0 },
              bottom: { md: 0 },
              mt: { xs: 2, md: 0 },
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <IconButton
              onClick={slidePrev}
              sx={{
                bgcolor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "primary.main", color: "white" },
                width: { xs: 40, md: "auto" },
                height: { xs: 40, md: "auto" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={slideNext}
              sx={{
                bgcolor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "primary.main", color: "white" },
                width: { xs: 40, md: "auto" },
                height: { xs: 40, md: "auto" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Slider Layout */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((restaurant, index) => (
                <Box
                  key={`${restaurant.id}-${currentIndex}`}
                  component={motion.div}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 100 : -100,
                    scale: 0.95,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -100 : 100,
                    scale: 0.95,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    opacity: { duration: 0.2 },
                  }}
                  sx={{
                    flex: {
                      xs: "0 0 100%",
                      sm: "0 0 45%",
                      md: `0 0 calc(${100 / itemsPerView}% - 24px)`,
                    },
                    maxWidth: { md: `calc(${100 / itemsPerView}% - 24px)` },
                    display: "flex",
                  }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </Box>
              ))}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularDishes;
