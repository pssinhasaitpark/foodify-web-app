import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import restaurantService from "../services/restaurantService";
import { formatINR } from "../utils/formatCurrency";

const OrderStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const [orderRes, trackRes] = await Promise.all([
          restaurantService.getOrderDetails(id),
          restaurantService.getOrderTrack(id),
        ]);
        setOrder(orderRes.data);
        setTrack(trackRes?.data || trackRes);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // Simulate real-time updates
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const history =
    track?.status_history ||
    track?.data?.status_history ||
    order?.status_history ||
    [];
  const steps =
    history.length > 0
      ? history.map((item) => item.message || item.status)
      : ["Order Confirmed", "Preparing your food", "Out for Delivery"];
  const activeStep = steps.length > 0 ? steps.length - 1 : 0;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
        Order #{order?.id?.slice(0, 8).toUpperCase() || "ORD12345"}
      </Typography>

      <Card sx={{ p: 4, borderRadius: 6, mb: 4, bgcolor: "background.paper" }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {new Date().toLocaleString()}
          </Typography>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ mb: 4 }}
          >
            {steps.map((label, index) => (
              <Step key={`${label}-${index}`}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-active": { color: "primary.main" },
                      "&.Mui-completed": { color: "primary.main" },
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color:
                        index <= activeStep ? "text.primary" : "text.secondary",
                    }}
                  >
                    {label}
                  </Typography>
                  {history[index]?.timestamp && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(history[index].timestamp).toLocaleString()}
                    </Typography>
                  )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            Order Items
          </Typography>
          {order?.items?.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography color="text.secondary">
                {item.quantity}x {item.name}
              </Typography>
              <Typography fontWeight={600}>
                {formatINR(item.price * item.quantity)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Payment Method
            </Typography>
            <Typography fontWeight={700}>
              {order?.payment_method || "COD"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary">
              Total Amount
            </Typography>
            <Typography variant="h5" fontWeight={800} color="primary">
              {formatINR(order?.total_amount)}
            </Typography>
          </Box>
        </Box>
      </Card>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => navigate("/")}
          sx={{ borderRadius: "15px", py: 2, fontWeight: 800 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderStatus;
