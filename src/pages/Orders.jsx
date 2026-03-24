import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import restaurantService from "../services/restaurantService";
import { formatINR } from "../utils/formatCurrency";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await restaurantService.getOrders();
        const list = response?.data?.orders || [];
        setOrders(list);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800}>
            Order History
          </Typography>
          <Typography color="text.secondary">
            Review your recent orders and track delivery status.
          </Typography>
        </Box>

        {orders.length === 0 ? (
          <Typography color="text.secondary">No orders found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      order.restaurant_image_url ||
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                    }
                    alt={order.restaurant_name}
                    sx={{
                      width: { xs: "100%", sm: 160 },
                      height: { xs: 180, sm: "100%" },
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                        mb: 1,
                      }}
                    >
                      <Typography fontWeight={800}>
                        {order.restaurant_name}
                      </Typography>
                      <Chip
                        label={order.order_status || "pending"}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {order.order_number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.items_count} items • {formatINR(order.total_amount)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString()
                        : ""}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        sx={{ borderRadius: 999, flex: { xs: "1 1 100%", sm: "0 0 auto" } }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/orders/${order.id}/track`)}
                        sx={{ borderRadius: 999, flex: { xs: "1 1 100%", sm: "0 0 auto" } }}
                      >
                        Track Order
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Orders;
