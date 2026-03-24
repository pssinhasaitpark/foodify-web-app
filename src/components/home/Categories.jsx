import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Typography, Container, Card, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Categories = ({
  categories = [],
  selectedCategory,
  onCategorySelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerView = 5;
  const allCategory = { id: "all", name: "All", icon: "🍽️" };
  const hasAllCategory = categories.some(
    (category) => category?.name?.toLowerCase() === "all",
  );
  const displayCategories = hasAllCategory
    ? categories
    : [allCategory, ...categories];
  const totalItems = displayCategories.length;

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

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (totalItems === 0) return;
    const timer = setInterval(slideNext, 3000);
    return () => clearInterval(timer);
  }, [slideNext, totalItems]);

  // Get visible items in a loop
  const getVisibleItems = () => {
    const items = [];
    if (totalItems === 0) return items;
    for (let i = 0; i < Math.min(itemsPerView, totalItems); i++) {
      items.push(displayCategories[(currentIndex + i) % totalItems]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  if (totalItems === 0) return null;

  return (
    <Box
      id="choose-your-meal"
      sx={{
        py: 12,
        bgcolor: "background.default",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: "center", position: "relative" }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, color: "secondary.main", fontWeight: 800 }}
          >
            Choose Your <span style={{ color: "#FF6B00" }}>Meal</span>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Fresh and healthy food for your daily lifestyle
          </Typography>

          {/* Navigation Buttons */}
          {/* <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <IconButton
              onClick={slidePrev}
              sx={{
                bgcolor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={slideNext}
              sx={{
                bgcolor: "background.paper",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box> */}
        </Box>

        <Box sx={{ position: "relative", height: "auto" }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
            }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((category, index) => {
                const isSelected =
                  (category.name === "All" && !selectedCategory) ||
                  selectedCategory === category.name;
                return (
                  <Box
                    key={`${category.id}-${currentIndex}`} // Unique key for AnimatePresence
                    component={motion.div}
                    initial={{
                      opacity: 0,
                      x: direction > 0 ? 100 : -100,
                      scale: 0.8,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      x: direction > 0 ? -100 : 100,
                      scale: 0.8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.2 },
                      x: { duration: 0.4 },
                    }}
                    sx={{
                      flex: {
                        xs: "0 0 100%",
                        sm: "0 0 45%",
                        md: `0 0 calc(${100 / itemsPerView}% - 24px)`,
                      },
                      maxWidth: { md: `calc(${100 / itemsPerView}% - 24px)` },
                    }}
                  >
                    <Card
                      onClick={() => {
                        if (!onCategorySelect) return;
                        if (category.name === "All") {
                          onCategorySelect(null);
                        } else {
                          onCategorySelect(category.name);
                        }
                      }}
                      sx={{
                        borderRadius: "40px",
                        border: "none",
                        bgcolor: "background.paper",
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                        transition: "all 0.3s ease",
                        outline: isSelected
                          ? "2px solid rgba(255,107,0,0.5)"
                          : "none",
                        transform: isSelected ? "translateY(-6px)" : "none",
                        "&:hover": {
                          boxShadow: "0 25px 50px rgba(255,107,0,0.15)",
                          bgcolor: "background.default",
                          transform: "translateY(-10px)",
                        },
                      }}
                    >
                      <Box sx={{ p: 4, textAlign: "center" }}>
                        <Box
                          sx={{
                            width: "80px",
                            height: "80px",
                            mx: "auto",
                            bgcolor: "rgba(255,107,0,0.1)",
                            borderRadius: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                            mb: 2,
                          }}
                        >
                          {category.icon}
                        </Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          sx={{ fontSize: { xs: "1.2rem", md: "1.1rem" } }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                    </Card>
                  </Box>
                );
              })}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Categories;
