import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import getTheme from "./theme/theme";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  const mode = useSelector((state) => state.theme.mode);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppRoutes />
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
