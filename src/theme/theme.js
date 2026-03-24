import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#FF6B00",
        light: "#FF8E3C",
        dark: "#E65100",
        contrastText: "#fff",
      },
      secondary: {
        main: mode === "light" ? "#2D3436" : "#FDFDFD", // Swap for visibility
        light: "#636E72",
        dark: "#1A1D1E",
        contrastText: mode === "light" ? "#fff" : "#2D3436",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#121212",
        paper: mode === "light" ? "#FDFDFD" : "#1E1E1E",
      },
      text: {
        primary: mode === "light" ? "#2D3436" : "#FFFFFF",
        secondary: mode === "light" ? "#636E72" : "#B0B0B0",
      },
    },
    typography: {
      fontFamily: '"Outfit", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: "-1.5px",
      },
      h2: {
        fontWeight: 800,
        letterSpacing: "-1px",
      },
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
        fontSize: "1rem",
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "50px",
            padding: "12px 28px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "24px",
            border:
              mode === "light"
                ? "1px solid rgba(0,0,0,0.05)"
                : "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.3s ease",
            backgroundImage: "none", // Remove default MUI dark paper gradient
            "&:hover": {
              boxShadow:
                mode === "light"
                  ? "0 20px 40px rgba(0,0,0,0.1)"
                  : "0 20px 40px rgba(0,0,0,0.4)",
              transform: "translateY(-5px)",
            },
          },
        },
      },
    },
  });

export default getTheme;
