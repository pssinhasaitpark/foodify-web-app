import React, { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import Categories from "../components/home/Categories";
import PopularDishes from "../components/home/PopularDishes";
import OffersSection from "../components/home/OffersSection";
import Testimonials from "../components/home/Testimonials";
import { Box, CircularProgress } from "@mui/material";
import { homeService } from "../services/api";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!initialLoading) setFiltering(true);
      try {
        const response = await homeService.getHomeData(selectedCategory);
        if (response.success) {
          setHomeData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      } finally {
        setInitialLoading(false);
        setFiltering(false);
      }
    };

    fetchHomeData();
  }, [selectedCategory, initialLoading]);

  if (initialLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box>
      <HeroSection />
      <Categories
        categories={homeData?.categories || []}
        selectedCategory={selectedCategory}
        onCategorySelect={(category) => {
          setSelectedCategory(category);
        }}
      />
      <PopularDishes
        restaurants={homeData?.restaurants || []}
        loading={filtering}
      />
      <OffersSection />
      <Testimonials />
    </Box>
  );
};

export default Home;
