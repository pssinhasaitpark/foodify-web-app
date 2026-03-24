import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/theme/themeSlice";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileOpen = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleGoProfile = () => {
    handleProfileClose();
    navigate("/profile");
  };
  const handleGoOrders = () => {
    handleProfileClose();
    navigate("/orders");
  };

  const navItems = isAuthenticated
    ? [
        { label: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
        { label: "Profile", path: "/profile" },
        { label: "Order History", path: "/orders" },
      ]
    : [
        { label: "Cart", path: "/cart", icon: <ShoppingCartIcon /> },
        { label: "Login", path: "/login", outlined: true },
        { label: "Signup", path: "/signup", variant: "contained" },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 2 }}>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Box
          component="svg"
          viewBox="0 0 64 64"
          sx={{ width: 36, height: 36 }}
        >
          <rect width="64" height="64" rx="14" fill="#FF6B00" />
          <g fill="#FFFFFF">
            <rect x="12" y="30" width="28" height="12" rx="2" />
            <rect x="40" y="26" width="12" height="16" rx="2" />
            <rect x="18" y="24" width="14" height="6" rx="2" />
            <circle cx="22" cy="46" r="4" />
            <circle cx="46" cy="46" r="4" />
            <rect x="44" y="30" width="6" height="6" rx="1" />
            <text
              x="26"
              y="38"
              textAnchor="middle"
              fontSize="6"
              fontWeight="700"
              fill="#FF6B00"
              fontFamily="Arial, sans-serif"
            >
              FOODIFY
            </text>
          </g>
        </Box>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemText>
              <Button
                component={Link}
                to={item.path}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                {item.label}
              </Button>
            </ListItemText>
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemText>
              <Button
                onClick={() => {
                  dispatch(logout());
                  setMobileOpen(false);
                }}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                Logout
              </Button>
            </ListItemText>
          </ListItem>
        )}
        <ListItem sx={{ justifyContent: "center", mt: 2 }}>
          <IconButton onClick={() => dispatch(toggleTheme())} color="primary">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        boxShadow: 1,
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              textDecoration: "none",
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 64 64"
              sx={{ width: 36, height: 36 }}
            >
              <rect width="64" height="64" rx="14" fill="#FF6B00" />
              <g fill="#FFFFFF">
                <rect x="12" y="30" width="28" height="12" rx="2" />
                <rect x="40" y="26" width="12" height="16" rx="2" />
                <rect x="18" y="24" width="14" height="6" rx="2" />
                <circle cx="22" cy="46" r="4" />
                <circle cx="46" cy="46" r="4" />
                <rect x="44" y="30" width="6" height="6" rx="1" />
                <text
                  x="26"
                  y="38"
                  textAnchor="middle"
                  fontSize="6"
                  fontWeight="700"
                  fill="#FF6B00"
                  fontFamily="Arial, sans-serif"
                >
                  FOODIFY
                </text>
              </g>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: "-0.5px",
              }}
            >
              Foodify
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{ display: "flex", gap: { xs: 1, md: 2 }, alignItems: "center" }}
        >
          {/* Theme Toggle */}
          <motion.div
            key={mode}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              sx={{
                color: mode === "light" ? "secondary.main" : "primary.main",
                bgcolor:
                  mode === "light"
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(255,255,255,0.04)",
                "&:hover": {
                  bgcolor:
                    mode === "light"
                      ? "rgba(0,0,0,0.08)"
                      : "rgba(255,255,255,0.08)",
                },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "flex" }}
                >
                  {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </motion.div>
              </AnimatePresence>
            </IconButton>
          </motion.div>

          {!isMobile && (
            <>
              <IconButton
                component={Link}
                to="/cart"
                color="primary"
                sx={{ position: "relative" }}
              >
                <ShoppingCartIcon />
                {cart.totalItems > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "error.main",
                      color: "white",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      border: "2px solid",
                      borderColor: "background.default",
                    }}
                  >
                    {cart.totalItems}
                  </Box>
                )}
              </IconButton>
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleProfileOpen}
                    sx={{
                      fontWeight: 700,
                      ml: 1,
                      color: "text.primary",
                      textTransform: "none",
                      borderRadius: "999px",
                      px: 2,
                      "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    Hi, {user?.full_name || user?.first_name || "User"}
                  </Button>
                  <Menu
                    anchorEl={profileAnchor}
                    open={Boolean(profileAnchor)}
                    onClose={handleProfileClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={handleGoProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleGoOrders}>Order History</MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleProfileClose();
                        dispatch(logout());
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    color="primary"
                    sx={{
                      px: 3,
                      "&:hover": {
                        backgroundColor: "primary.light",
                        color: "white",
                        borderColor: "primary.light",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="primary"
                    sx={{
                      ml: 2,
                      px: 3,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(255,107,0,0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Signup
                  </Button>
                </>
              )}
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
};

export default Header;
