import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import restaurantService from "../services/restaurantService";
import { formatINR } from "../utils/formatCurrency";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await restaurantService.getOrderDetails(id);
        setOrder(response?.data || null);
      } catch (error) {
        console.error("Error fetching order detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

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

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography>Order not found.</Typography>
        <Button onClick={() => navigate("/orders")} sx={{ mt: 2 }}>
          Back to Orders
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          Order Details
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {order.order_number}
        </Typography>

        <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
            Items
          </Typography>
          {order.items?.map((item, index) => (
            <Box
              key={`${item.menu_item_id || item.id || index}`}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">
                {item.quantity}x {item.name}
              </Typography>
              <Typography fontWeight={700}>
                {formatINR(item.price * item.quantity)}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography color="text.secondary">Items Total</Typography>
            <Typography fontWeight={700}>
              {formatINR(order.items_total)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography color="text.secondary">Delivery Fee</Typography>
            <Typography fontWeight={700}>
              {formatINR(order.delivery_fee)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography color="text.secondary">Tax</Typography>
            <Typography fontWeight={700}>
              {formatINR(order.tax)}
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
          >
            <Typography color="text.secondary">Discount</Typography>
            <Typography fontWeight={700}>
              {formatINR(order.discount)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontWeight={800}>Total</Typography>
            <Typography fontWeight={800} color="primary.main">
              {formatINR(order.total_amount)}
            </Typography>
          </Box>
        </Card>

        <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
            Delivery Address
          </Typography>
          <Typography color="text.secondary">
            {order.delivery_address?.full_address || ""}
          </Typography>
          {order.delivery_instructions && (
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Instructions: {order.delivery_instructions}
            </Typography>
          )}
        </Card>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/orders")}
            sx={{ borderRadius: 999 }}
          >
            Back to Orders
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(`/orders/${order.id}/track`)}
            sx={{ borderRadius: 999 }}
          >
            Track Order
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderDetail;
