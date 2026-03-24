import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import restaurantService from "../services/restaurantService";

const OrderTrack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const response = await restaurantService.getOrderTrack(id);
        setData(response?.data || response);
      } catch (error) {
        console.error("Error tracking order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [id]);

  const history = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data.status_history)) return data.status_history;
    if (Array.isArray(data?.data?.status_history)) return data.data.status_history;
    if (Array.isArray(data?.history)) return data.history;
    if (Array.isArray(data?.tracking)) return data.tracking;
    return [];
  }, [data]);

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
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Track Order
        </Typography>

        <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
          {history.length === 0 ? (
            <Typography color="text.secondary">
              Tracking details are not available yet.
            </Typography>
          ) : (
            <>
              <Box sx={{ position: "relative", pl: 3 }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 9,
                    top: 6,
                    bottom: 6,
                    width: 2,
                    bgcolor: "divider",
                  }}
                />
                {history.map((step, index) => (
                  <Box
                    key={`${step.status}-${index}`}
                    sx={{ display: "flex", gap: 2, mb: 3 }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        flexShrink: 0,
                        mt: 0.5,
                      }}
                    />
                    <Box>
                      <Typography fontWeight={800}>
                        {step.status?.toUpperCase()}
                      </Typography>
                      {step.message && (
                        <Typography variant="body2" color="text.secondary">
                          {step.message}
                        </Typography>
                      )}
                      {step.timestamp && (
                        <Typography variant="caption" color="text.secondary">
                          {new Date(step.timestamp).toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography color="text.secondary">
                We’ll update this page as your order progresses.
              </Typography>
            </>
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
            onClick={() => navigate(`/orders/${id}`)}
            sx={{ borderRadius: 999 }}
          >
            View Details
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderTrack;
