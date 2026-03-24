import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Divider,
  Grid,
  Modal,
  Paper,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import restaurantService from "../services/restaurantService";
import { formatINR } from "../utils/formatCurrency";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressSaveError, setAddressSaveError] = useState("");
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const formatAddress = (address) => {
    if (!address) return "";
    const label =
      address.label || address.address_type || address.type || "Address";
    const fullAddress =
      address.full_address || address.fullAddress || address.address || "";
    if (fullAddress) return `${label}: ${fullAddress}`;
    const line1 =
      address.line1 || address.address_line_1 || address.address1 || "";
    const line2 =
      address.line2 || address.address_line_2 || address.address2 || "";
    const city = address.city || "";
    const state = address.state || "";
    const pincode = address.pincode || address.zip || "";
    const parts = [line1, line2, city, state, pincode].filter(Boolean);
    return `${label}: ${parts.join(", ") || "No address details"}`;
  };

  const truncateText = (text, maxLength = 45) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const formatAddressShort = (address) => {
    if (!address) return "";
    const label =
      address.label || address.address_type || address.type || "Address";
    const fullAddress =
      address.full_address || address.fullAddress || address.address || "";
    const shortBase = fullAddress || formatAddress(address).replace(`${label}: `, "");
    return `${label}: ${truncateText(shortBase)}`;
  };

  const normalizeAddresses = (response) => {
    if (!response) return [];
    const data =
      response.data?.data ||
      response.data?.results ||
      response.data ||
      response.addresses ||
      response;
    return Array.isArray(data) ? data : [];
  };

  const loadAddresses = async () => {
    setAddressLoading(true);
    setAddressError("");
    try {
      const response = await restaurantService.getAddresses();
      const list = normalizeAddresses(response);
      setAddresses(list);
      if (list.length > 0) {
        const defaultId = list[0].id || list[0].address_id;
        setSelectedAddressId(defaultId || "");
      } else {
        setSelectedAddressId("");
      }
    } catch (error) {
      setAddressError(
        error.response?.data?.message || "Failed to load addresses.",
      );
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadAddresses();
  }, [user]);

  const handleAddressChange = (field) => (event) => {
    setAddressForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSaveAddress = async () => {
    setAddressSaveError("");
    if (
      !addressForm.line1.trim() ||
      !addressForm.city.trim() ||
      !addressForm.state.trim() ||
      !addressForm.pincode.trim()
    ) {
      setAddressSaveError("Please fill all required fields.");
      return;
    }

    setAddressSaving(true);
    try {
      const fullAddress = [
        addressForm.line1,
        addressForm.line2,
        addressForm.city,
        addressForm.state,
        addressForm.pincode,
      ]
        .filter(Boolean)
        .join(", ");
      const payload = {
        full_address: fullAddress,
        label: addressForm.label,
        line1: addressForm.line1,
        line2: addressForm.line2,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode,
      };
      const response = await restaurantService.createAddress(payload);
      const created =
        response?.data?.data || response?.data || response?.address || response;
      const createdId = created?.id || created?.address_id;
      await loadAddresses();
      if (createdId) {
        setSelectedAddressId(createdId);
      }
      setShowAddressForm(false);
      setAddressForm({
        label: "Home",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (error) {
      setAddressSaveError(
        error.response?.data?.message || "Failed to save address.",
      );
    } finally {
      setAddressSaving(false);
    }
  };

  const selectedAddress = addresses.find(
    (address) =>
      (address.id || address.address_id) === selectedAddressId,
  );

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        restaurant_id: cart.restaurantId,
        items: cart.items.map((item) => ({
          menu_item_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          is_veg: item.is_veg,
        })),
        delivery_address_id: selectedAddressId,
        payment_method: "COD",
        delivery_instructions: "Please ring bell twice",
      };

      const response = await restaurantService.createOrder(orderData);
      if (response.success) {
        setOrderSuccess(true);
        setTimeout(() => {
          dispatch(clearCart());
          navigate(`/order-status/${response.data.id}`);
        }, 2000);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      if (error.response?.status === 403) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0 && !orderSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: "center" }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Add some delicious food from your favorite restaurant!
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ borderRadius: "50px", px: 6, py: 2 }}
        >
          Browse Restaurants
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "background.paper" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight={800}>
          My Order
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        <Grid item xs={12} md={7} lg={8}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 3,
              justifyContent: "flex-start",
            }}
          >
            <Card
              sx={{
                p: 0,
                borderRadius: 0,
                overflow: "visible",
                background: "transparent",
                boxShadow: "none",
                border: "none",
              }}
            >
              {cart.items.map((item, index) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      bgcolor: "background.paper",
                      borderRadius: "40px",
                      boxShadow: "0 30px 80px rgba(12,20,40,0.08)",
                      minHeight: { xs: 90, md: 120 },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        sx={{ mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                      >
                        {formatINR(item.price)} / unit
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "rgba(255,245,240,0.9)",
                          borderRadius: "999px",
                          p: "6px 6px",
                          border: "1px solid",
                          borderColor: "rgba(255,107,0,0.08)",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => dispatch(removeFromCart(item))}
                          sx={{
                            color: "#ff6b00",
                            bgcolor: "transparent",
                            borderRadius: "999px",
                            px: 1,
                            py: 0.3,
                            "&:hover": { bgcolor: "rgba(255,107,0,0.12)" },
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography
                          sx={{
                            mx: 2,
                            fontWeight: 800,
                            color: "primary.dark",
                            minWidth: "28px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => dispatch(addToCart(item))}
                          sx={{
                            color: "#ff6b00",
                            bgcolor: "transparent",
                            borderRadius: "999px",
                            px: 1,
                            py: 0.3,
                            "&:hover": { bgcolor: "rgba(255,107,0,0.12)" },
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="h5"
                        fontWeight={900}
                        color="text.primary"
                      >
                        {formatINR(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Card>

            <Card
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "28px",
                boxShadow: "0 30px 60px rgba(12,20,40,0.08)",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.04)",
                bgcolor: "background.paper",
                alignSelf: "stretch",
                minHeight: { xs: 120, md: 150 },
              }}
            >
              <Typography variant="h6" fontWeight={900} gutterBottom>
                Delivery Address
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                <Box
                  sx={{
                    bgcolor: "linear-gradient(135deg,#ffecd6,#ffd6b8)",
                    p: 1,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    boxShadow: "0 8px 20px rgba(255,107,0,0.12)",
                  }}
                >
                  <LocationOnIcon sx={{ color: "#ff6b00" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  {addressLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={18} />
                      <Typography color="text.secondary" fontWeight={700}>
                        Loading addresses...
                      </Typography>
                    </Box>
                  ) : addressError ? (
                    <Typography color="error.main" fontWeight={700}>
                      {addressError}
                    </Typography>
                  ) : addresses.length === 0 ? (
                    <Typography color="text.secondary" fontWeight={700}>
                      No saved addresses. Add one to continue.
                    </Typography>
                  ) : (
                    <FormControl fullWidth size="small">
                      <Select
                        value={selectedAddressId}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        displayEmpty
                        sx={{
                          borderRadius: "12px",
                          fontWeight: 700,
                          "& .MuiSelect-select": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                        }}
                        renderValue={(selected) => {
                          const addr = addresses.find(
                            (address) =>
                              (address.id || address.address_id) === selected,
                          );
                          return addr
                            ? formatAddressShort(addr)
                            : "Select address";
                        }}
                      >
                        {addresses.map((address) => {
                          const id = address.id || address.address_id;
                          return (
                            <MenuItem key={id} value={id}>
                              {formatAddressShort(address)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          sx={{
            position: { md: "sticky" },
            top: { md: 24 },
            alignSelf: "flex-start",
          }}
        >
          <Card
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "32px",
              bgcolor: "background.paper",
              boxShadow: "0 20px 60px rgba(12,20,40,0.08)",
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch",
              maxHeight: 420,
              minHeight: 320,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={900}
              gutterBottom
              sx={{ mb: 4, textAlign: { xs: "left", md: "left" } }}
            >
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography color="text.secondary" fontWeight={700}>
                Items Total
              </Typography>
              <Typography fontWeight={800}>
                {formatINR(cart.subtotal)}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography color="text.secondary" fontWeight={700}>
                Delivery Fee
              </Typography>
              <Typography fontWeight={800}>
                {formatINR(cart.deliveryFee)}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            >
              <Typography color="text.secondary" fontWeight={700}>
                Tax (5%)
              </Typography>
              <Typography fontWeight={800}>{formatINR(cart.tax)}</Typography>
            </Box>

            <Divider
              sx={{ mb: 4, borderStyle: "dashed", borderWidth: "1px" }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 5,
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={900}>
                Total Amount
              </Typography>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{ color: "#ff6b00" }}
              >
                {formatINR(cart.totalAmount)}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                    return;
                  }
                  setShowCheckoutModal(true);
                }}
                sx={{
                  borderRadius: "28px",
                  py: 2.2,
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  background: "linear-gradient(135deg,#ff8a34,#ff5a00)",
                  boxShadow: "0 30px 60px rgba(255,90,0,0.18)",
                  "&:hover": {
                    boxShadow: "0 35px 80px rgba(255,90,0,0.2)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.25s ease",
                }}
              >
                {loading ? "Processing..." : "PROCEED TO PAY"}
              </Button>
              {!isAuthenticated && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  Please log in to place an order.
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Checkout Confirmation Modal */}
      <Modal
        open={showCheckoutModal}
        onClose={() => !loading && setShowCheckoutModal(false)}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 500,
            p: 4,
            borderRadius: "40px 40px 0 0",
            textAlign: "center",
          }}
        >
          {orderSuccess ? (
            <Box sx={{ py: 4 }}>
              <CheckCircleOutlineIcon
                color="success"
                sx={{ fontSize: 100, mb: 2 }}
              />
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Order Placed!
              </Typography>
              <Typography color="text.secondary">
                Your delicious meal is on its way!
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>
                Confirm Order
              </Typography>
              <Box sx={{ textAlign: "left", mb: 4 }}>
                <Typography fontWeight={700}>Deliver to:</Typography>
                {addresses.length > 0 ? (
                  <Typography color="text.secondary" gutterBottom>
                    {formatAddress(selectedAddress || addresses[0])}
                  </Typography>
                ) : (
                  <Typography color="text.secondary" gutterBottom>
                    No saved address found.
                  </Typography>
                )}
                {addresses.length === 0 && (
                  <Box sx={{ mt: 2 }}>
                    {showAddressForm ? (
                      <Box sx={{ display: "grid", gap: 2 }}>
                        <FormControl size="small">
                          <Select
                            value={addressForm.label}
                            onChange={handleAddressChange("label")}
                            sx={{ borderRadius: "12px", fontWeight: 700 }}
                          >
                            {[
                              "Home",
                              "Office",
                              "Work",
                              "Friend's Home",
                              "Other",
                            ].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          label="Address Line 1 *"
                          value={addressForm.line1}
                          onChange={handleAddressChange("line1")}
                          size="small"
                          required
                        />
                        <TextField
                          label="Address Line 2"
                          value={addressForm.line2}
                          onChange={handleAddressChange("line2")}
                          size="small"
                        />
                        <TextField
                          label="City *"
                          value={addressForm.city}
                          onChange={handleAddressChange("city")}
                          size="small"
                          required
                        />
                        <TextField
                          label="State *"
                          value={addressForm.state}
                          onChange={handleAddressChange("state")}
                          size="small"
                          required
                        />
                        <TextField
                          label="Pincode *"
                          value={addressForm.pincode}
                          onChange={handleAddressChange("pincode")}
                          size="small"
                          required
                        />
                        {addressSaveError && (
                          <Typography color="error.main" fontWeight={700}>
                            {addressSaveError}
                          </Typography>
                        )}
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Button
                            variant="outlined"
                            fullWidth
                            disabled={addressSaving}
                            onClick={() => setShowAddressForm(false)}
                            sx={{ borderRadius: "20px", py: 1.4 }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            fullWidth
                            disabled={addressSaving}
                            onClick={handleSaveAddress}
                            sx={{ borderRadius: "20px", py: 1.4 }}
                          >
                            {addressSaving ? "Saving..." : "Save Address"}
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => setShowAddressForm(true)}
                        sx={{ borderRadius: "20px", py: 1.2 }}
                      >
                        Add Address
                      </Button>
                    )}
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={700}>Total Amount to Pay</Typography>
                  <Typography variant="h6" fontWeight={800} color="primary">
                    {formatINR(cart.totalAmount)}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                disabled={loading || !selectedAddressId}
                sx={{ borderRadius: "20px", py: 2, fontWeight: 800 }}
              >
                {loading ? "Placing Order..." : "Confirm & Place Order"}
              </Button>
            </>
          )}
        </Paper>
      </Modal>
    </Container>
  );
};

export default Cart;
