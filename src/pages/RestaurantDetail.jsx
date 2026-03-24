import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Skeleton,
  Snackbar,
  TextField,
  Rating,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import restaurantService from "../services/restaurantService";
import { formatINR } from "../utils/formatCurrency";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewToast, setReviewToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, menuRes, reviewsRes] = await Promise.all([
          restaurantService.getRestaurantDetails(id),
          restaurantService.getMenu(id),
          restaurantService.getReviews(id),
        ]);

        setRestaurant(restaurantRes.data);
        setMenu(menuRes.data);
        setReviews(reviewsRes?.data?.reviews || reviewsRes?.data || []);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
        setReviewLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, restaurant_id: id }));
    setToastOpen(true);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const getItemQuantity = (itemId) => {
    const item = cart.items.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const handleReviewSubmit = async () => {
    if (!reviewForm.comment.trim()) return;
    setReviewSubmitting(true);
    try {
      const payload = {
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      };
      const response = await restaurantService.createReview(id, payload);
      const created = response?.data || response;
      setReviews((prev) => [created, ...prev]);
      setReviewForm({ rating: 5, comment: "" });
      setReviewToast(true);
    } catch (error) {
      console.error("Failed to create review:", error);
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4 }} />
      </Container>
    );
  }

  return (
    <Box
      sx={{
        pb: 12,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg,#0f0f12 0%,#141418 100%)"
            : "linear-gradient(180deg,#fafafa 0%,#f3f3f3 100%)",
        minHeight: "100vh",
      }}
    >
      {/* HERO HEADER */}

      <Box
        sx={{
          height: { xs: 220, md: 350 },
          position: "relative",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${restaurant?.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
            bgcolor: "rgba(255,255,255,0.2)",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography
            sx={{
              fontSize: { xs: 34, md: 56 },
              fontWeight: 900,
              letterSpacing: "-1px",
            }}
          >
            {restaurant?.name}
          </Typography>

          <Typography sx={{ opacity: 0.9 }}>
            {restaurant?.description}
          </Typography>
        </Box>
      </Box>

      {/* MENU SECTION */}

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: "40px",
              backdropFilter: "blur(20px)",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(20,20,24,0.9)"
                  : "rgba(255,255,255,0.95)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 30px 80px rgba(0,0,0,0.5)"
                  : "0 30px 80px rgba(0,0,0,0.08)",
            }}
          >
          {/* HEADER */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
            }}
          >
            <Typography sx={{ fontSize: 34, fontWeight: 800 }}>
              Popular Menu
            </Typography>

            <Chip
              icon={<ShoppingBagIcon />}
              label={`${menu.length} Items Available`}
            />
          </Box>

          {/* GRID */}

          <Grid container spacing={3}>
            {menu.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  component={motion.div}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    background: "background.paper",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 15px 40px rgba(0,0,0,0.5)"
                        : "0 15px 40px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: { xs: 360, md: 380 },
                  }}
                >
                  {/* IMAGE */}

                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image_url}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {item.discount > 0 && (
                      <Chip
                        label={`-${item.discount}%`}
                        sx={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          background: "#E91E63",
                          color: "white",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Box>

                  {/* CONTENT */}

                  <Box
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      minHeight: { xs: 180, md: 190 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "text.secondary",
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "40px",
                      }}
                    >
                      {item.description}
                    </Typography>

                    {/* BOTTOM SECTION */}

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "22px",
                          fontWeight: 800,
                          color: "primary.main",
                        }}
                      >
                        {formatINR(item.price)}
                      </Typography>

                      {getItemQuantity(item.id) > 0 ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton
                            onClick={() => handleRemoveFromCart(item)}
                          >
                            <RemoveIcon />
                          </IconButton>

                          <Typography fontWeight={700}>
                            {getItemQuantity(item.id)}
                          </Typography>

                          <IconButton onClick={() => handleAddToCart(item)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button
                          startIcon={<AddIcon />}
                          onClick={() => handleAddToCart(item)}
                          sx={{
                            borderRadius: "30px",
                            px: 3,
                            py: 0.6,
                            fontWeight: 700,
                            color: "white",
                            background: (theme) =>
                              theme.palette.mode === "dark"
                                ? "linear-gradient(135deg,#ff8a2b,#ff5a1f)"
                                : "linear-gradient(135deg,#ff7a18,#ff4d00)",
                            boxShadow: (theme) =>
                              theme.palette.mode === "dark"
                                ? "0 8px 20px rgba(255,107,0,0.45)"
                                : "0 8px 20px rgba(255,107,0,0.3)",
                            flexShrink: 0,
                          }}
                        >
                          ADD
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* REVIEWS SECTION */}

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "32px",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(20,20,24,0.9)"
                : "rgba(255,255,255,0.95)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 20px 60px rgba(0,0,0,0.5)"
                : "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontSize: 30, fontWeight: 800 }}>
              Reviews
            </Typography>
            <Typography color="text.secondary">
              Share your experience and see what others are saying.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 2, mb: 5 }}>
            <Typography fontWeight={700}>Write a Review</Typography>
            <Rating
              value={reviewForm.rating}
              onChange={(_, value) =>
                setReviewForm((prev) => ({
                  ...prev,
                  rating: value || 1,
                }))
              }
            />
            <TextField
              multiline
              minRows={3}
              placeholder="Tell us about your meal..."
              value={reviewForm.comment}
              onChange={(event) =>
                setReviewForm((prev) => ({
                  ...prev,
                  comment: event.target.value,
                }))
              }
            />
            <Box>
              <Button
                variant="contained"
                onClick={handleReviewSubmit}
                disabled={reviewSubmitting || !reviewForm.comment.trim()}
                sx={{ borderRadius: 999, px: 4 }}
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: 2 }}>
            {reviewLoading ? (
              <Typography color="text.secondary">Loading reviews...</Typography>
            ) : reviews.length === 0 ? (
              <Typography color="text.secondary">
                No reviews yet. Be the first to review!
              </Typography>
            ) : (
              reviews.map((review, index) => (
                <Card
                  key={review.id || index}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography fontWeight={700}>
                      {review.user?.full_name ||
                        review.user?.first_name ||
                        review.user_name ||
                        "Customer"}
                    </Typography>
                    <Rating
                      value={Number(review.rating) || 0}
                      readOnly
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {review.comment || review.review || ""}
                  </Typography>
                  {review.created_at && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.created_at).toLocaleString()}
                    </Typography>
                  )}
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Container>

      {/* CART BAR */}

      {cart.totalItems > 0 && (
        <Box
          onClick={() => navigate("/cart")}
          sx={{
            position: "fixed",
            bottom: 25,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: 650,
            background: "linear-gradient(135deg,#ff7a18,#ff4d00)",
            color: "white",
            p: 2,
            borderRadius: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 20px 60px rgba(255,107,0,0.4)",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <Typography fontWeight={700}>{cart.totalItems} Items</Typography>

          <Typography fontWeight={800}>
            View Cart • {formatINR(cart.totalAmount)}
          </Typography>
        </Box>
      )}

      {/* TOAST */}

      <Snackbar
        open={toastOpen}
        autoHideDuration={2000}
        onClose={() => setToastOpen(false)}
        message="Added to cart!"
      />

      <Snackbar
        open={reviewToast}
        autoHideDuration={2000}
        onClose={() => setReviewToast(false)}
        message="Review submitted!"
      />
    </Box>
  );
};

export default RestaurantDetail;
